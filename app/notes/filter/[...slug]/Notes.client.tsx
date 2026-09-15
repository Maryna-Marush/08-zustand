'use client';

import { useState, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import { Note } from '@/types/note'; 

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

import css from './NotesClient.module.css';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

 
  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1); 
  };

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
        <button type="button" onClick={handleOpenModal} className={css.addButton}>
          Create Note
        </button>
      </div>

     {!isLoading && !isError && <NoteList notes={notes} />}

{totalPages > 1 && (
  <Pagination
    pageCount={totalPages}
    forcePage={page - 1}
    onPageChange={handlePageChange}
  />
)}

{isModalOpen && (
  <Modal onClose={handleCloseModal}>
    <NoteForm onClose={handleCloseModal} />
  </Modal>
)}
    </div>
  );
}
