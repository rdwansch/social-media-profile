'use client';

import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import Prism from 'prismjs';
import '~/styles/prism.css';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type Code = {
  name: string;
  email: string;
  imgSrc: string;
  title: string;
  website: string;
  slug: string;
};

export default function Code({ website, title }: { website: string; title: string }) {
  const getData = () => fetch('/api/code');
  const [code, setCode] = useState<Code>();
  const { status } = useSession();
  const [edit, setEdit] = useState(false);

  const handleSave = async () => {
    document.querySelectorAll<HTMLInputElement>('.inp').forEach(inp => {
      inp.value = '';
    });

    const res = await fetch(`/api/code?title=${title}&website=${website}`);
    const data = await res.json();
    setEdit(false);
    setCode(data);
  };

  useEffect(() => {
    (async () => {
      const res = await getData();
      const data = await res.json();

      setCode(data);
    })();
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, website, title, status, edit]);

  useEffect(() => {
    if (website.length !== 0 || title.length !== 0) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [website, title]);

  return (
    <>
      <div className="Code">
        <pre>
          {status == 'unauthenticated' && (
            <code
              className="language-javascript"
              dangerouslySetInnerHTML={{
                __html: `const Card = {
    name: 'Your Name',
    email: 'myemail.co',
    website: 'acme.com',
    title: 'Technical Architect',
}`,
              }}
            />
          )}

          {status == 'authenticated' && code && (
            <code
              className="language-javascript"
              dangerouslySetInnerHTML={{
                __html: `const Card = {
    name: '${code.name} ',
    email: '${code.email}',
    website: '${website.length == 0 ? code.website : website}',
    title: '${title.length == 0 ? code.title : title}',
}`,
              }}
            />
          )}
        </pre>
      </div>

      {status == 'authenticated' && edit && (
        <button className="px-7 py-1 bg-gradient-to-br from-violet-700 to-pink-400 text-white" onClick={handleSave}>
          Save
        </button>
      )}

      {status == 'authenticated' && !edit && (
        <Link
          href={`/c/${code?.slug}`}
          className="relative bg-gradient-to-tr from-violet-700 to-pink-600 bg-clip-text text-transparent hover:underline"
        >
          View
        </Link>
      )}
    </>
  );
}
