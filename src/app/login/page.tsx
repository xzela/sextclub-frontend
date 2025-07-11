"use client";

import { login } from '@/app/actions/auth';
import { useActionState } from 'react';

const initialState = {
  message: '',
}

export default function LoginPage() {
  const [state, loginAction, pending] = useActionState(login, initialState)
  console.log('login:pages.tsx:state', state)

  return (
    <div className="">
      <div className="hero-wrapper flex flex-col justify-center items-center p-2 min-h-screen">
        <form className="flex flex-col" action={loginAction}>
          <div className="grid grid-cols-3 p-2 rounded-md">
            <div className="text-right pr-1 pt-1">
              <label className="font-bold" htmlFor="phone">phone:</label>
            </div>
            <div className="col-span-2">
              <input className="border border-amber-300 rounded-md p-1" type="tel" name="phone" placeholder="### ###-####" required pattern="[0-9]+" />
            </div>
          </div>
          <div className="grid grid-cols-3 m-2">
            <div className="text-right pr-1 pt-1">
              <label className="font-bold" htmlFor="password">password:</label>
            </div>
            <div className="col-span-2">
              <input className="border border-amber-300 rounded-md p-1" type="password" name="password" placeholder="password" required />
            </div>
          </div>
          {state?.message && (
            <div className="text-red-500 text-center">
              {state?.message}
            </div>
          )}
          <div className="flex justify-end m-2">
            <button disabled={pending} className="bg-amber-500 p-2 rounded-md text-zinc-900 font-bold text-xl uppercase flex" type="submit">
              Go
              <svg className="pt-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="fill-zinc-900 stroke-zinc-900 stroke-1" d="M21 12L14 5V9H3.8C3.51997 9 3.37996 9 3.273 9.0545C3.17892 9.10243 3.10243 9.17892 3.0545 9.273C3 9.37996 3 9.51997 3 9.8V14.2C3 14.48 3 14.62 3.0545 14.727C3.10243 14.8211 3.17892 14.8976 3.273 14.9455C3.37996 15 3.51997 15 3.8 15H14V19L21 12Z" strokeLinecap='round' strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
