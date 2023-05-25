import AuthProvider from '~/components/AuthProvider';
import './globals.css';
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Social Media Profile',
  description: 'social media profile',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
