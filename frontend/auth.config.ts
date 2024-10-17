import { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

const publicRoutes = ['/dashboard'];
const authRoutes = ['/auth/signin'];

export default {
  providers: [Google],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      if (publicRoutes.includes(pathname)) {
        return true;
      }

      if (authRoutes.includes(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      }

      return isLoggedIn;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        // console.log(session);
        session.user.id = token.sub;
        console.log(session);
        console.log(session.user.id);
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      console.log('token:', token);
      console.log('useer:', user);

      return token;
    },
  },
  pages: {
    signIn: '/',
  },
} satisfies NextAuthConfig;
