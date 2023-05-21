'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <h1 className="text-center text-3xl">Next Auth</h1>
      hello
      <div className="w-[500px] mx-auto">
        {session && JSON.stringify(session)}
        <br />
        {session && (
          <button className="px-5 py-2 rounded bg-red-500 text-white" onClick={() => signOut()}>
            Logout
          </button>
        )}
        {!session && (
          <button className="px-5 py-2 rounded bg-blue-500 text-white" onClick={() => signIn()}>
            Login
          </button>
        )}
      </div>
    </>
  );
}
