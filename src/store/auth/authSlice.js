
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'checking', // checking, not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, { payload = {} }) => {
            return {// Enfoque diferente, creo una copia explicita y redux-toolkit se encarga de hacer el merge o reemplazar el estado
                ...initialState,
                status: 'not-authenticated',
                errorMessage: payload?.errorMessage
            };
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
            state.errorMessage = null;
        }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;
