'use client';

import { useSession } from 'next-auth/react';
import Code from '~/components/Code';

export default function Home() {
  const { data } = useSession();

  const html = `
const Ridhwan = {
  name: "Ridhwan Rasyid Siddiq",
  age: 21,
  techstack: 'JS, TS, Next, Prisma',
}`;

  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <div className=" w-96 h-96 ">
        <Code code={html} language="javascript" />
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
