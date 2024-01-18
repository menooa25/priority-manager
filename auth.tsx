import NextAuth from "next-auth";

import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";

export const config = {
//   theme: {
//     logo: "https://next-auth.js.org/img/logo/logo-sm.png",
//   },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
