import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import { prisma } from 'prisma/confiq';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        console.log('Find user: ', `'${credentials?.username}'`);

        const user = await prisma.user.findFirst({
          where: {
            username: credentials?.username,
          },
        });

        if (!user) {
          console.log('User not found');
          return null;
        }
        console.log('User found');
        console.time('compare password...');
        const isMatched = bcrypt.compareSync(`${credentials?.password}`, `${user.password}`);
        console.timeEnd('compare password...');

        if (!isMatched) {
          // eslint-disable-next-line quotes
          console.log("password didn't match");
          return null;
        }

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, account }) {
      console.log('JWT Account', account);
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
});

export { handler as GET, handler as POST };
