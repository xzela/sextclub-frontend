import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  console.log('protected:session:', session);
  if (!session || !session?.user?.phone) {
    redirect('/login');
  }

  if (!session || !session?.user?.avVerified) {
    redirect('/verification');
  }

  return (
    <div className="">
      <div className="hero-wrapper flex flex-col justify-center items-center p-2 min-h-screen">
        <h1 className="text-5xl">Protected Route</h1>
      </div>
    </div>
  )
}
