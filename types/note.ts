
export type NoteTag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string; 
}


export interface CreateNoteDto {
  title: string;
  content: string;
  tag: NoteTag;
}


export type NewNote = CreateNoteDto;
