'use client';

import { useEffect } from 'react';
import Prism from 'prismjs';
import '~/styles/prism.css';

export default function Code({ code, language }: { code: string; language: string }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="Code">
      <h2> Code Syntax Block {language}</h2>
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
