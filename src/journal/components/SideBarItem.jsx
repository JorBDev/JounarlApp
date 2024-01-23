import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { activateNote } from "../../store/journal/thunks";

export const SideBarItem = ({ title = '', body, date, id, imageUrls = [] }) => {

    const dispath = useDispatch();
    const viewNote = () => {
        dispath(activateNote({ title, body, id, date, imageUrls }));
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
