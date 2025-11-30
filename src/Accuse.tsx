import { Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStyles } from "./Utils/Styles.ts";
import BottomBar from "./components/BottomBar.tsx";

// was accusation correct?
// yes => win
// no => remove player and move to next turn

export default function Accuse(props: any): any {

    const classes = useStyles();
    const navigate = useNavigate();
    const params = useParams();
    const playerId = parseInt(params.playerId || String(location.pathname.split('/').pop()));

    const playersAfter = props.game.players.slice(playerId);
    const playersBefore = props.game.players.slice(0, playerId);
    const playerTurnOrder = [...playersAfter, ...playersBefore];

    const [nextPlayerId] = useState({ ...playerTurnOrder[1] }.id);
    const onCorrect = () => {
        //win
        navigate(`/win/${playerId}`);
    }

    const onWrong = () => {
        // lose and keep going
        // splice or slice player out of game and go to next turn
        // const currentPlayer = game.players.filter(player => player.id === playerId)[0];
        // const tempGame = game;
        // tempGame.players.splice(game.players.indexOf(currentPlayer), 1);
        // setGame(tempGame);
        navigate(`/turn/${nextPlayerId}`);
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.root}>
                <Typography variant='h3'>Did they get it right?</Typography>
            </Paper>
            <BottomBar>
                <Button color='primary' variant='contained' className={classes.buttonInput} onClick={onCorrect}>Correct</Button>
                <Button color='secondary' variant='contained' className={classes.buttonInput} onClick={onWrong}>Wrong!</Button>
            </BottomBar>
        </div >
    )
}