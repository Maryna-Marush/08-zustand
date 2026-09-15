import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'The page you are looking for does not exist.',
    url: 'https://notehub.com/404',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Page Not Found',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page not found</h1>
      <p>Sorry, the requested page could not be found.</p>
    </main>
  );
}
