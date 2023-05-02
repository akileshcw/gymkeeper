import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Axios from "src/Axios/Axios";
export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials;
        console.log(email, password);
        const res = await Axios.post("/signin", { email, password });

        if (res.status === 200) {
          // Any object returned will be saved in `user` property of the JWT

          return res.data;
        } else if (res.status === 401 || res.status === 404) {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;

      return session;
    },
  },

  pages: {
    signIn: "/",
  },
};
export default NextAuth(authOptions);
