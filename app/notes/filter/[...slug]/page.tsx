import type { Metadata } from 'next';
import NotesClient from '@/app/notes/filter/[...slug]/Notes.client'; 
type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filterTag = slug?.[0] || 'all';
  const filterName = filterTag.toUpperCase();

  const title = `${filterName} Notes | NoteHub`;
  const description = `View and manage notes filtered by category: ${filterName}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${slug?.join('/') || ''}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${filterName} Notes`,
        },
      ],
    },
  };
}

// Компонент сторінки
export default async function FilterPage({ params }: Props) {
  
  const { slug } = await params;
  const tag = slug?.[0] || 'all';

  return (
    <main>
      <NotesClient tag={tag} />
    </main>
  );
}
