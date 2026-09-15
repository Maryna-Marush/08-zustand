import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer'; 
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
});

const BASE_URL = 'https://notehub-public.goit.study/api/auth'; 

export const metadata: Metadata = {
  title: 'NoteHub - Your Personal Notes Manager',
  description: 'Organize your notes easily and efficiently with NoteHub.',
  openGraph: {
    title: 'NoteHub - Your Personal Notes Manager',
    description: 'Organize your notes easily and efficiently with NoteHub.',
    url: BASE_URL,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub App',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={roboto.className}>
        {}
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
