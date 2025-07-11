import { User } from "@/app/lib/definitions";
import bcrypt from 'bcrypt';
import mysql from "mysql2/promise";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import z from 'zod';

// import { authConfig } from "./auth.config";

async function getUser(phone: string): Promise<User | undefined> {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "sextclub",
  });

  try {
    const [results] = await connection.query(
      `SELECT * FROM members WHERE phone="${phone}"`
    );
    const user = results[0];
    return user as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const authOptions = {
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async session({ session, user, token }) {
      console.log('session:session', session);
      console.log('session:user', user);
      console.log('session:token', token);
      session.user = token.user;
      return session
    },
    async jwt({ token, user }){
      console.log('jwt:user', user);
      console.log('jwt:token', token);
      if (user) {
        token.user = user;
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log('signin:account', account);
      console.log('signin:user', user);
      console.log('signin:profile', profile);
      console.log('signin:email', email);
      console.log('signin:credentials',credentials);
      return true
    },
  },
  // session: {
  //   strategy: 'jwt', // 'jwt' or 'database'
  //   maxAge: 30 * 24 * 60 * 60, // Session expiration (30 days)
  // },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "phone", type: "text", placeholder: "phone" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const parsedCredentials = z.object({
            phone: z.string(),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { phone, password } = parsedCredentials.data;
          const user = await getUser(phone);
          if (!user) {
            return undefined;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            console.log('authorize: user password matches');
            return user;
          }
        }
        return undefined;
      },
    }),
  ],
}

// export const { auth, signIn, signOut } = NextAuth({

// });

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

