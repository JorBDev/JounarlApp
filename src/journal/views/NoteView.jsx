import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo } from "react"
import { activateNote } from "../../store/journal"
import { startSaveNote } from "../../store/journal/thunks"

export const NoteView = () => {

    const dispath = useDispatch();
    const { active: note } = useSelector(state => state.journal);

    const { body, title, date, onInputChange, formState } = useForm(note);

    useEffect(() => {
        dispath(activateNote(formState))
    }, [formState])

    const dateString = useMemo(() => {
        return moment(date).format('LLL');
    }, [date])

    const onSaveNote = () => {
        dispath(startSaveNote())
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
                <Button
                    onClick={onSaveNote}
                    color="primary"
                    sx={{ padding: 2 }}
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

            <ImageGallery />
        </Grid>
    )
}
