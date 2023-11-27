import { Link as RouterLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useErrorMessage, useForm } from "../../hooks";

import { startCreatingUserWithEmailAndPassword } from "../../store/auth";

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*+-]{6,}$/;

const formValidations = {
    email: [(value) => emailRegex.test(value), 'El correo no es válido'],
    password: [(value) => passwordRegex.test(value), 'La contraseña debe tener mínimo 6 caracteres, una mayúscula, una minúscula y un número'],
    displayName: [(value) => value.length > 0, 'El nombre es obligatorio']
}

export const RegisterPage = () => {

    const dispath = useDispatch();

    const { status, errorMessage } = useSelector(state => state.auth)

    const isAuthenticating = status === 'loading';

    const showMessageError = useErrorMessage(errorMessage);

    const {
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations);

    const onSubmit = (event) => {
        event.preventDefault();
        if (!isFormValid()) return;

        dispath(startCreatingUserWithEmailAndPassword(formState));
    }

    return (
        <AuthLayout title="Crear Cuenta">
            <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
                <Grid container>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre completo"
                            type="text"
                            placeholder="Nombre completo"
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid}
                            helperText={displayNameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid}
                            helperText={emailValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="Password"
                            placeholder="Contraseña"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid}
                            helperText={passwordValid}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid
                            item
                            xs={12}
                            display={showMessageError ? 'block' : 'none'}
                        >
                            <Alert severity="error">{errorMessage}</Alert>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                disabled={isAuthenticating}
                                type="submit"
                                variant='contained'
                                fullWidth
                            >
                                Crear Cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                        <Link component={RouterLink} color='inherit' to="/auth/login">
                            Ingresar
                        </Link>
                    </Grid>


                </Grid>
            </form>

        </AuthLayout>
    )
}
