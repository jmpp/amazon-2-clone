import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        // ...add more providers here
    ],
});
