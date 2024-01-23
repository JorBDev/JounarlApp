import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSaving: false,
    messageSabed: '',
    notes: [],
    active: null,
    // active: {
    //     id: 'ABC123',
    //     title: '',
    //     body: '',
    //     date: 1234567,
    //     imageUrls: [], // ['https://foto1.jpg', 'https://foto2.jpg']
    // }
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            // TODO: mensaje de error...
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id == action.payload.id) {
                    console.log('este es:', note, action.payload)
                    note = action.payload;
                }
                return note;
            })
        },
        deleteNodeById: (state, action) => {

        },
    }
});

export const {
    addNewEmptyNote,
    deleteNodeById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
} = journalSlice.actions;
