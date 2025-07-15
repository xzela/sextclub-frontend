import 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      phone: string
      avVerified: boolean
    }
  }

  // interface User extends DefaultUser {
  //   phone: string;
  //   avVerified: boolean;
  // }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    phone: string;
    avVerified: boolean;
  }
}
