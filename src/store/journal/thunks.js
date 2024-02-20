import { collection, doc, setDoc, deleteDoc, writeBatch } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, clearAllNotes, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote))
    }

}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    }
}

export const activateNote = (note) => {
    return async (dispatch) => {
        dispatch(setActiveNote(note))
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true }); // El merge true es para que no se borre el resto de propiedades que no se estan actualizando

        dispatch(updateNote(note))
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());
        // Disparar simultaneamente
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls));

        // Se dispara en secuencia y no simultaneamente:
        // for (let i = 0; i < files.length; i++) {
        //     await fileUpload(files[i]);
        // }
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));

    }
}

export const startDeletingAllNotes = () => {
    return async (dispatch, getState) => {

        //Obtenemos el id del usuario y el arreglo de las notas del store
        const { uid } = getState().auth;
        const { notes } = getState().journal;

        //Usamos la escritura por lotes que provee Firestore
        const batch = writeBatch(FirebaseDB);

        //Recorremos el arreglo de las notas y mandamos la referencia a los documentos que
        //queremos borrar mandando el id de cada uno
        notes.forEach(note => {
            batch.delete(doc(FirebaseDB, `${uid}/journal/notes/${note.id}`));
        });

        //Al final hacemos el commit de la escritura por lotes
        await batch.commit();

        //Borramos el contenido del arreglo de notas
        dispatch(clearAllNotes()); //state.notes = []; esto en el reducer respectivo

    }
}
