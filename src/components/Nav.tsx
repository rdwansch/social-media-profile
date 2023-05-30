import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
  const { data, status } = useSession();

  return (
    <div className="absolute top-5 left-0 right-0 mx-auto w-[1200px] max-w-full px-5">
      <div className="flex justify-between items-center">
        <Image src="/vercel.svg" width={70} alt="logo" height={30} />

        {status == 'authenticated' && (
          <div>
            <div className=" inline-block relative group">
              <button className="bg-gradient-to-tr from-violet-200 to-pink-200 py-2 px-4 rounded inline-flex items-center">
                <span className="mr-1 font-semibold">{data.user.name}</span>
              </button>

              <div className="group-hover:block absolute hidden text-gray-700 pt-1">
                <Link
                  className="rounded-b bg-violet-200 hover:bg-violet-300 hover:text-white py-2 px-4 block whitespace-no-wrap cursor-pointer"
                  href={'.'}
                  onClick={async e => {
                    e.preventDefault();
                    await signOut({ redirect: false });
                  }}
                >
                  Sign Out
                </Link>
              </div>
            </div>
          </div>
        )}

        {status == 'unauthenticated' && (
          <Link
            href="/signin"
            className="bg-gradient-to-tr from-violet-200 to-pink-200 py-2 px-4 rounded inline-flex items-center"
          >
            <span className="mr-1 font-semibold">Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}
