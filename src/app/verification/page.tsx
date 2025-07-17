
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function VerificationPage() {
  const session = await getServerSession(authOptions);
  console.log('verification', session);
  if (!session?.user?.phone) {
    redirect('/');
  }

  return (
    <div className="">
      <h1>Verification page</h1>
      <p>Before we can let you enjoy this site, we need to verify your age.</p>
    </div>
  )
}
