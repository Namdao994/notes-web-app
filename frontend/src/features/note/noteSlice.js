import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createNewNoteAPI, deleteNoteAPI, getNotesByUserIdAPI, toggleEditNoteAPI} from './noteAPI';

export const getNotesByUserId = createAsyncThunk('note/getNotesByUserId', async () => {
  return await getNotesByUserIdAPI();
});

export const createNewNote = createAsyncThunk('note/createNewNote', async (noteData) => {
  return await createNewNoteAPI(noteData);
});

export const toggleEditNote = createAsyncThunk('note/toggleEditNote', async ({noteId, noteData}) => {
  return await toggleEditNoteAPI(noteId, noteData);
});

export const deleteNote = createAsyncThunk('note/deleteNote', async (noteId) => {
  return await deleteNoteAPI(noteId);
});

const initialState = {
  notes: [],
  status: {
    getNotesByUserId: 'idle',
    createNewNote: 'idle',
    toggleEditNote: 'idle',
  },
  message: {
    getNotesByUserId: null,
    createNewNote: null,
    toggleEditNote: null,
  },
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    resetStateGetNotesByUserId: (state) => {
      state.status.getNotesByUserId = 'idle';
      state.message.getNotesByUserId = null;
    },
    resetStateCreateNewNote: (state) => {
      state.status.createNewNote = 'idle';
      state.message.createNewNote = null;
    },
    resetToggleEditNote: (state) => {
      state.status.toggleEditNote = 'idle';
      state.message.toggleEditNote = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotesByUserId.pending, (state) => {
        state.status.getNotesByUserId = 'loading';
      })
      .addCase(getNotesByUserId.fulfilled, (state, action) => {
        state.status.getNotesByUserId = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(getNotesByUserId.rejected, (state, action) => {
        state.status.getNotesByUserId = 'failed';
        console.log('action rejected in getNotesByUserId', action);
        state.message.getNotesByUserId = action.error?.message || 'Something went wrong';
      })
      .addCase(createNewNote.pending, (state) => {
        state.status.createNewNote = 'loading';
      })
      .addCase(createNewNote.fulfilled, (state) => {
        state.status.createNewNote = 'succeeded';
      })
      .addCase(createNewNote.rejected, (state, action) => {
        state.status.createNewNote = 'failed';
        state.message.createNewNote = action.error?.message || 'Something went wrong';
      })
      .addCase(toggleEditNote.pending, (state) => {
        state.status.toggleEditNote = 'loading';
      })
      .addCase(toggleEditNote.fulfilled, (state) => {
        state.status.toggleEditNote = 'succeeded';
      })
      .addCase(toggleEditNote.rejected, (state) => {
        state.status.toggleEditNote = 'failed';
      });
  },
});

export const {resetStateGetNotesByUserId, resetStateCreateNewNote} = noteSlice.actions;

export default noteSlice.reducer;
