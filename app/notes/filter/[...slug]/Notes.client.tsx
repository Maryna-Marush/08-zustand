'use client';

import { useState, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import Link from 'next/link'; // ✅ Додано імпорт Link
import { fetchNotes } from '@/lib/api';
import { Note } from '@/types/note'; 

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
// ❌ Прибрали Modal та NoteForm, оскільки створення перенесено на окрему сторінку

import css from './NotesClient.module.css';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  // ❌ Прибрали стан isModalOpen

  const [debouncedSearch] = useDebounce(searchQuery, 300);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { page, search: debouncedSearch, tag }],
    queryFn: () => fetchNotes({ page, search: debouncedSearch, tag }),
  });

  const notes: Note[] = data?.notes || [];
  const totalPages: number = data?.totalPages || 1;

  // ❌ Прибрали handleOpenModal та handleCloseModal

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1); 
  };

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
        
        {/* ✅ Замість <button> з модалкою використовуємо <Link> */}
        <Link href="/notes/action/create" className={css.addButton}>
          Create note +
        </Link>
      </div>

      {!isLoading && !isError && <NoteList notes={notes} />}

      {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          forcePage={page - 1}
          onPageChange={handlePageChange}
        />
      )}

      {}
    </div>
  );
}
