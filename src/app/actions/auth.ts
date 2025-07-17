// import { signIn } from 'next-auth/react';
// import { redirect } from 'next/navigation';


export async function login(previousState: any, formData: FormData) {
  const phone = formData.get('phone');
  const password = formData.get('password');
  const countryCode = formData.get('countryCode');
  console.log({phone, password, countryCode});
  // const response = await signIn('credentials', { phone, password, redirect: false })
  // console.log('actions:auth:signin', response);

  //   if (response.ok) {
  //     return redirect('/protected')
  //   }
    return {
      message: 'Oops! Check your credentials and try again.'
    }
}

