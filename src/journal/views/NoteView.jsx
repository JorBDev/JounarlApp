import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from "../components"
import moment from "moment"
import { useForm } from "../../hooks/useForm"
import { activateNote, startDeletingNote, startUploadingFiles } from "../../store/journal"
import { startSaveNote } from "../../store/journal/thunks"

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);

    const { body, title, date, imageUrls, onInputChange, formState } = useForm(note);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(activateNote(formState))
    }, [formState])

    const dateString = useMemo(() => {
        return moment(date).format('LLL');
    }, [date])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved])

    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;

        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No se podrá revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(startDeletingNote());

                Swal.fire(
                    'Eliminado',
                    'Tu archivo ha sido eliminado',
                    'success'
                )
            }
        })
    }

    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid>

            <Grid item>

                <input
                    type="file"
                    multiple // Permite seleccionar multiples archivos
                    onChange={onFileInputChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    onClick={onSaveNote}
                    color="primary"
                    sx={{ padding: 2 }}
                    disabled={isSaving}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    sx={{ border: 'none', mb: 1 }}
                    placeholder="Ingrese un título"
                    label="Título"
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué pasó hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            <ImageGallery images={imageUrls} />
        </Grid>
    )
}
