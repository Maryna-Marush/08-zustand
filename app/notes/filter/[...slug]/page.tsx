import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api'; // Перевірте правильність шляху до api.ts
import NotesClient from './Notes.client';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function NotesFilterPage({ params }: PageProps) {
  // Отримуємо масив slug з асинхронних параметрів
  const resolvedParams = await params;
  
  // Якщо slug є і містить хоча б один елемент — це і є наш tag, інакше дефолтно 'all'
  const tag = resolvedParams.slug?.[0] || 'all';

  const queryClient = new QueryClient();

  // Виконуємо prefetch запиту на сервері з урахуванням tag
  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, search: '', tag }],
    queryFn: () => fetchNotes({ page: 1, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
