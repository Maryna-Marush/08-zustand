'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({
  id,
}: NotePreviewClientProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <button type="button" onClick={handleClose}>
        Close
      </button>

      {isLoading && <p>Loading note details...</p>}

      {isError && <p>Error loading note details.</p>}

      {note && (
        <div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          {note.tag && <span>Tag: {note.tag}</span>}
        </div>
      )}
    </Modal>
  );
}