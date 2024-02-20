import { useDispatch } from "react-redux"
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { startLogout } from "../../store/auth"
import { clearNotesLogout } from "../../store/journal/journalSlice"

export const NavBar = ({ drawerWidth = 240 }) => {

    const dispath = useDispatch()

    const onLogout = () => {
        dispath(startLogout());
        dispath(clearNotesLogout());
    }

    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    eddge='start'
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography viarnt='h6' noWrap component='div'>JournalApp</Typography>

                    <IconButton
                        color='error'
                        onClick={onLogout}
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>

        </AppBar >
    )
}
