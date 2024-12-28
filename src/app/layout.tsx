import './globals.css';
import { Noto_Sans_JP } from 'next/font/google';

const notoJp = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata = {
  title: 'MC Battle Search',
  description: 'Search for MC battles',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="dark">
      <body className={`${notoJp.className} bg-black text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
