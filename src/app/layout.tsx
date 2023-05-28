import AuthProvider from '~/components/AuthProvider';
import './globals.css';

export const metadata = {
  title: 'Virtual Card',
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
