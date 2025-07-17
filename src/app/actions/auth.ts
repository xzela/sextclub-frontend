import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';


export async function login(previousState: any, formData: FormData) {
  const rawPhone = formData.get('phone') as string;
  const rawPassword = formData.get('password') as string;
  const countryCode = formData.get('countryCode') as string;

  const numericPhoneNumber = rawPhone.replace(/\D/g, '');
  const numericCountryCode = countryCode.replace(/\D/g, '');

  const phone = `${numericCountryCode}${numericPhoneNumber}`;
  console.log({phone, numericPhoneNumber, rawPassword, numericCountryCode});
  const response = await signIn('credentials', { phone, password: rawPassword, redirect: false })


    if (response?.ok) {
      return redirect('/protected')
    }
    return {
      message: 'Oops! Check your credentials and try again.'
    }
}

