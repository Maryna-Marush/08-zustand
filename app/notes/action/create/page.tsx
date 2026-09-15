import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';

export const dynamic = 'force-dynamic';

const pageTitle = 'Create Note | NoteHub';
const pageDescription = 'Create and save a new note easily in NoteHub.';
const pageUrl = 'https://notehub-public.goit.study/notes/action/create';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create Note in NoteHub',
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main>
      <h1>Create note</h1>
      <NoteForm />
    </main>
  );
}
