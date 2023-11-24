import { registerUserWithEmailPassword, singInWithEmail, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./"


export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await singInWithGoogle();
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    }
}

export const startEmailSignIn = (email, password) => {
    return async (dispath) => {
        dispath(checkingAuthentication());

        const result = await singInWithEmail({ email, password });
        if (!result.ok) return dispath(logout(result));

        dispath(login(result));

    }
}

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await registerUserWithEmailPassword({ email, password, displayName });

        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result))
    }
}
