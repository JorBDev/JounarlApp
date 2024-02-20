import { useDispatch, useSelector } from "react-redux"
import { Box, Button, Divider, Drawer, Grid, List, Toolbar, Typography } from "@mui/material"
import { SideBarItem } from "./";
import { DeleteOutline } from "@mui/icons-material";
import { startDeletingAllNotes } from "../../store/journal";


export const SideBar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch();

    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);

    const onDelete = () => {
        dispatch(startDeletingAllNotes());
    }

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}// flexShrink sirve para que el sidebar no se encime con el contenido
        >
            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map(note => (
                            < SideBarItem key={note.id} {...note} />
                        ))
                    }
                </List>

                {
                    (notes.length > 0) ?
                        <Grid container justifyContent='center'>
                            <Button
                                onClick={onDelete}
                                sx={{ mt: 2 }}
                                color='error'
                            >
                                <DeleteOutline />
                                Borrar todas las notas
                            </Button>
                        </Grid> : ''
                }

            </Drawer>

        </Box>
    )
}
