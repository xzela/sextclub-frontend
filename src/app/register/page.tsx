"use client";

import { CountryCodeInput } from '@/components/PhoneNumberInput/CountryCodeInput';
import { CountryCodeConfig, countryCodeList } from '@/components/PhoneNumberInput/countryCodeList';
import { PhoneNumberInput } from '@/components/PhoneNumberInput/PhoneNumberInput';
import { Input } from '@headlessui/react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useActionState, useCallback, useState } from 'react';
import z from 'zod';

const initialState = {
  phone: '',
  message: '',
}

export async function register(previousState: any, formData: FormData) {
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;
  const schema = {
    phone: z.string().regex(new RegExp(/^\+[1-9]\d{1,14}$/)),
    password: z.string().min(6),
  };
  const validator = z.object(schema).safeParse({phone, password});
  if (validator.error) {
    return {
      phone,
      message: validator.error.issues[0].message
    }
  }
  if (validator.success) {
    const user = await fetch('/api/register/', {
      body: formData,
      method: 'POST'
    });
    console.log('register[page.tsx]:register', user);
    const response = await signIn('credentials', {
      phone: phone,
      password: password,
      redirect: false
    });

    console.log('actions:auth:signin', response);

    if (response.ok) {
      return redirect('/protected')
    }
  }

  return {
    phone,
    message: 'Oops! Something went horribly wrong',
  }
}

export default function RegisterPage() {
  const {data: session, status } = useSession();
// phone number logic
const [phoneNumber, setPhoneNumber] = useState('');
const handlePhoneChange = useCallback((value: string) => {
  setPhoneNumber(value);
}, []);

// country code logic
const [countryCode, setCountryCode] = useState<CountryCodeConfig['code']>('+1');
const handleCodeChange = useCallback((nextCode?: CountryCodeConfig['code']) => {
  if (nextCode) {
    setCountryCode(nextCode);
  }
}, []);

const mask = countryCodeList.find(({ code }) => code === countryCode)?.mask;
  const [state, registerAction, pending] = useActionState(register, initialState)
  if (session?.user?.phone) {
    redirect('/');
  }
  console.log('register:pages.tsx:state', state)
  return (
    <div className="px-4">
      <div className="hero-wrapper flex flex-col justify-center items-center p-2 min-h-screen">
        <div>
          <h1 className="text-4xl pb-4 text-zinc-200 font-bold">Sign Up Now</h1>
        </div>
        <form className="flex flex-col min-w-96" action={registerAction}>
          <div className="flex flex-col gap-2">
            <label className="cursor-pointer text-base font-bold pt-2" htmlFor="phone">
              Phone Number:
            </label>
            <div className="flex gap-3">
              <CountryCodeInput
                id="countryCode"
                countryList={countryCodeList}
                value={countryCode}
                onChange={handleCodeChange}
              />
              <PhoneNumberInput
                id="phone"
                mask={mask}
                onChange={handlePhoneChange}
                value={phoneNumber}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="cursor-pointer text-base font-bold pt-2" htmlFor="password">
              Password:
            </label>
            <Input
              placeholder="password"
              id="password"
              name="password"
              className='rounded-md px-2 py-2 text-base border border-amber-300'
              type="password"
            />
          </div>

          <div className="flex flex-col justify-end pt-4">
            <button disabled={pending} className="cursor-pointer bg-amber-500 p-2 py-1 rounded-md text-zinc-900 font-bold text-xl uppercase flex justify-end" type="submit">
              Go
              <svg className="pt-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="fill-zinc-900 stroke-zinc-900 stroke-1" d="M21 12L14 5V9H3.8C3.51997 9 3.37996 9 3.273 9.0545C3.17892 9.10243 3.10243 9.17892 3.0545 9.273C3 9.37996 3 9.51997 3 9.8V14.2C3 14.48 3 14.62 3.0545 14.727C3.10243 14.8211 3.17892 14.8976 3.273 14.9455C3.37996 15 3.51997 15 3.8 15H14V19L21 12Z" strokeLinecap='round' strokeLinejoin="round" />
              </svg>
            </button>
            {state?.message && (
            <div className="text-red-500 text-center w-full">
              {state?.message}
            </div>
          )}
            <div className="flex justify-center pt-4">
              <span>Have an account?</span>
              <Link className="px-1 rounded-md text-amber-500 hover:text-amber-300 hover:bg-orange-900/50" href="/login">Login here</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
