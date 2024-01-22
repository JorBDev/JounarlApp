import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { activateNote } from "../../store/journal/thunks";

export const SideBarItem = ({ note }) => {
    const { title, body, id } = note;
    const dispath = useDispatch();
    const viewNote = () => {
        dispath(activateNote(note));
    }

    return (
        <ListItem disablePadding>
            <ListItemButton >
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container
                    overflow="hidden"
                    onClick={viewNote}
                >
                    <ListItemText
                        disableTypography
                        primary={title}
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
