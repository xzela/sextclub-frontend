"use client"

// import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

function AuthButton() {
  const {data: session} = useSession();
  if (session) {
    return (
      <div>
        <div>
          {session?.user?.phone_formatted}
        </div>
        <button className="cursor-pointer p-1 font-bold bg-amber-500 hover:text-amber-700 rounded-md" onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      <button className="cursor-pointer p-1 px-2 font-bold text-black bg-amber-500 hover:text-amber-700 rounded-md uppercase" onClick={() => signIn()}>Sign In</button>
    </div>
  );
}


export default function NavHeader() {
  return (
    <div className="flex justify-around items-center py-2">
      <Link href="/">Home</Link>
      <Link href="/protected">Protected Route</Link>
      <AuthButton />
    </div>
  )
}
