import { User } from '@/app/lib/definitions';
import 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: User
  }

  // interface AdapterUser extends User {
  //   food?: string;
  // }
  // interface User extends DefaultUser {
  //   phone: string;
  //   avVerified: boolean;
  // }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user?: User
  }
}
