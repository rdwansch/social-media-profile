'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import Code from '~/components/Code';
import Nav from '~/components/Nav';

export default function Home() {
  const { status } = useSession();
  const [website, setWebsite] = useState('');
  const [title, setTitle] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <Nav />
      <div className="w-screen min-h-screen flex justify-center items-center">
        <div className=" w-96 h-96 ">
          {status == 'unauthenticated' && <h3 className="text-xl">Create a visual card</h3>}

          {status == 'authenticated' && (
            <div className="flex gap-5">
              <input
                type="text"
                className="inp border-pink-500 rounded border focus:outline-none py-1 px-3"
                onChange={e => setWebsite(e.target.value)}
                placeholder="Website"
              />
              <input
                type="text"
                className="inp border-pink-500 rounded border focus:outline-none py-1 px-3"
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
          )}
          <Code website={website} title={title} />
        </div>
      </div>
    </div>
  );
}

// import { signIn, signOut, useSession } from 'next-auth/react';

// export default function Home() {
//   const { data: session } = useSession();

//   return (
//     <>
//       <h1 className="text-center text-3xl">Next Auth</h1>

//       <div className="w-[500px] mx-auto">
//         {session && JSON.stringify(session)}
//         <br />
//         {session && (
//           <button className="px-5 py-2 rounded bg-red-500 text-white" onClick={() => signOut()}>
//             Logout
//           </button>
//         )}
//         {!session && (
//           <button className="px-5 py-2 rounded bg-blue-500 text-white" onClick={() => signIn()}>
//             Login
//           </button>
//         )}
//       </div>
//     </>
//   );
// }
