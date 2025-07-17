import { User } from "@/app/lib/definitions";
import bcrypt from 'bcrypt';
import mysql, { RowDataPacket } from "mysql2/promise";
import NextAuth, { Account, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
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
    ) as RowDataPacket[];
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
    newUser: '/register' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async session({ session, token }: {session: Session, token: JWT }) {
      session.user = token.user;
      return session
    },
    async jwt({ token, user, account } : { token: JWT, user: User, account: Account } ){
      if (user || account) {
        token.user = user;
      }
      return token;
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log('signin:account', account);
    //   console.log('signin:user', user);
    //   console.log('signin:profile', profile);
    //   console.log('signin:email', email);
    //   console.log('signin:credentials',credentials);
    //   return true
    // },
  },
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
          console.log('credentials', credentials);
        if (parsedCredentials.success) {
          const { phone, password } = parsedCredentials.data;
          const user = await getUser(phone);
          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            console.log('authorize: user password matches');
            return user as User;
          }
        }
        return null;
      },
    }),
  ],
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

