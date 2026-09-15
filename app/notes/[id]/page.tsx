import type { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api'; // Перевірте шлях до вашої функції API

type Props = {
  params: Promise<{ id: string }>;
};

// 1. Асинхронна генерація SEO-метаданих
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    const title = `${note.title} | NoteHub`;
    const description = note.content ? note.content.slice(0, 150) : 'Note details';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://notehub.com/notes/${id}`, // Або ваш живий Vercel URL
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Note Details | NoteHub',
      description: 'View note details in NoteHub.',
    };
  }
}

// 2. Компонент сторінки (використовуємо params через await)
export default async function NotePage({ params }: Props) {
  const { id } = await params; // ✅ Використовуємо params, щоб ESLint не видавав помилку

  return (
    <main>
      {/* Тут відображаються деталі нотатки */}
      <h1>Note ID: {id}</h1>
    </main>
  );
}
