// Here, we are on a Node.js backend
// Everything underneath "/api/" folder is BACKEND code !

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { items, email } = req.body;

    // console.log(items);
    // console.log(email);

    // @Todo : READ THE STRIPE DOCS!

    const transformedItems = items.map((item) => ({
        description: item.description,
        quantity: 1, // @Todo : Deal with the quantity feature!!
        price_data: {
            currency: "eur",
            unit_amount: item.price * 100, // ?? why RTFM!
            product_data: {
                name: item.title,
                images: [item.image],
            },
        },
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ["shr_1ItxEGD8l9oFdCaKmyn7pZyk"], // Created fees in Stripe's dashboard
        shipping_address_collection: {
            allowed_countries: ["GB", "US", "CA", "FR"], // RTFM!
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item) => item.image)),
        },
    });

    console.log("session created!", session.id);

    res.status(200).json({ id: session.id });
};
