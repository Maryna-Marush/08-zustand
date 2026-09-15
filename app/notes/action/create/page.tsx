import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';


export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description: 'Create a new note in NoteHub',
};

export default function CreateNotePage() {
  return (
    <main>
      <h1>Create note</h1>
      <NoteForm />
    </main>
  );
}
