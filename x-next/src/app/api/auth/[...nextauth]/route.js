import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // This callback is called whenever a user signs in
    async session({ session, token }) {
      if (session.user.name && typeof session.user.name === "string") {
        session.user.username = session.user.name
          .trim()
          .split(/\s+/) // split on one or more spaces (handles multiple spaces)
          .join("")
          .toLowerCase();
      } else {
        session.user.username = "unknown";
      }
      session.user.uid = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
