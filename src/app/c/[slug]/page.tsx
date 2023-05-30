'use client';

import { useEffect, useState } from 'react';
import Code from '~/components/Code';
import Prism from 'prismjs';
import '~/styles/prism.css';
import Link from 'next/link';

type Code = {
  name: string;
  email: string;
  imgSrc: string;
  title: string;
  website: string;
  slug: string;
};

export default function Page({ params }: { params: { slug: string } }) {
  const getData = () => fetch('/api/code');
  const [code, setCode] = useState<Code>();

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  useEffect(() => {
    (async () => {
      const res = await getData();
      const data = await res.json();

      setCode(data);
    })();
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-tr from-pink-200 to-violet-200">
      <div>
        <div className="Code">
          <pre>
            {code && (
              <code
                className="language-javascript"
                dangerouslySetInnerHTML={{
                  __html: `const Card = {
   name: '${code.name}',
   email: '${code.email}',
   website: '${code.website}',
   title: '${code.title}',
}`,
                }}
              />
            )}

            {!code && (
              <code
                className="language-javascript"
                dangerouslySetInnerHTML={{
                  __html: `const Card = {
   name: '',
   email: '',
   website: '',
   title: '',
}`,
                }}
              />
            )}
          </pre>
        </div>
        <br />
        <Link href="/">create your own</Link>
      </div>
    </div>
  );
}
