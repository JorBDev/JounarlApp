import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result); // Obtener Credenciales
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }

    } catch (error) {

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

export const singInWithEmail = async ({ email, password }) => {

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)

        const { displayName, photoURL, uid } = resp.user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        }

    } catch (error) {
        // Handle Errors here.
        const errorMessage = error.message == "Firebase: Error (auth/invalid-login-credentials)." ? "El correo o contraseña es incorrecta" : error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        //FirebaseAuth.currentUser => contiene la información del usuario actual
        await updateProfile(FirebaseAuth.currentUser, { displayName });// Actualizar el nombre de usuario

        return {
            ok: true,
            displayName, email, photoURL, uid
        }

    } catch (error) {
        const errorMessage = error.message == "Firebase: Error (auth/email-already-in-use)." ? "El correo ya esta en uso" : error.message;
        return { ok: false, errorMessage }
    }
}

export const logoutFirebase = async () => {
    try {
        await signOut(FirebaseAuth);
        return { ok: true }
    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }
}
