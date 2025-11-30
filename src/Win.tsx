import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useStyles } from "./Utils/Styles.ts";

export default function Win() {
    const params = useParams();
    const playerIdStr = params.playerId || String(location.pathname.split('/').pop());
    const player = parseInt(playerIdStr) + 1;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h3">{`Player ${player} Wins!`}</Typography>
        </div>
    )
}