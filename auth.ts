import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [Google],
  secret: process.env.JWT_SECRET,

  callbacks: {
    async session({ token, session }) {
      session.user.id = token.sub as string;

      return session;
    },
  },
});
