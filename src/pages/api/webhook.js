import { buffer } from "micro"; // @todo: what's micro ? RTFM!
import * as admin from "firebase-admin";

const serviceAccount = require("../../../permissions.json"); // Can't do an import here!

// Merge permissions with environment secret keys
serviceAccount.client_id = process.env.FIREBASE_ADMIN_CLIENT_ID;
serviceAccount.private_key_id = process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID;
serviceAccount.private_key = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
      })
    : admin.app();

// Etablish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET; // WHERE IS THIS?
const fulfillOrder = async (session) => {
    console.log("Fulfilling order", session);

    const images = JSON.parse(session.metadata.images).map((image) =>
        JSON.stringify(image)
    );

    return app
        .firestore()
        .collection("AMAZON_users")
        .doc(session.metadata.email)
        .collection("orders")
        .doc(session.id)
        .set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: images,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            console.log(
                `SUCCESS: Order ${session.id} had been added to the DB`
            );
        })
        .catch((err) => console.log("Erreur a l'insertion !", err.message));
};

export default async (req, res) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;
        // Verify that the EVENT posted came from stripe :
        // https://stripe.com/docs/connect/webhooks

        try {
            event = stripe.webhooks.constructEvent(
                payload,
                sig,
                endpointSecret
            );
        } catch (err) {
            console.log("ERROR", err.message);
            return res.status(400).send(`Webhook error: ${err.message}`);
        }

        // Handle the checkout.session.completed event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            // Fulfill the order...
            return fulfillOrder(session)
                .then(() => res.status(200))
                .catch((err) =>
                    res.status(400).send(`Webhook Error: ${err.message}`)
                );
        }
    }
};

export const config = {
    api: {
        bodyParser: false, // Useless for webhooks
        externalResolver: true,
    },
};
