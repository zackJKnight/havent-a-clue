import { Typography } from "@mui/material";
import { useStyles } from "./Utils/Styles.ts";

export default function Win(props: any) {
const player = props.matchProps.match.params.playerId + 1;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h3">Player ${player} Wins!</Typography>
        </div>
    )
}