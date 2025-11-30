import { Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { Game } from "./Model/Game.ts";
import { getAccentColor } from './Utils/playerAccent.ts';
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Utils/Styles.ts";
import BottomBar from "./components/BottomBar.tsx";

export default function WhichPlayer(props: any) {
    const history = useNavigate();
    const classes = useStyles();
    const params = useParams();
    let playerCount = parseInt((params.playerCount as string) || '0');
    // normalize count to sensible defaults for Clue (2-6)
    if (Number.isNaN(playerCount) || playerCount < 2) playerCount = 2;
    if (playerCount > 6) playerCount = 6;
    const [mainPlayerId, setPlayerId] = useState(0);
    const [game, setGame] = useState<Game>(props.game);

    function onClick() {
        history(`/hand/${mainPlayerId}`);
    }

    // derive players to show (slice to playerCount in case game.players longer)
    const playersToShow = (game.players || []).slice(0, playerCount);

    return (
        <div className={classes.root}>
            <Typography variant='h3'>Which Player Are You?
            </Typography>
            <Paper className={classes.root}>
            <TextField
                className={classes.numberSelect}
                select
                value={mainPlayerId}
                onChange={(e) => {
                    const id = Number(e.target.value);
                    setPlayerId(id);
                    let tempGame: Game = game;
                    tempGame.mainPlayerId = id;
                    setGame({ ...game, ...tempGame });
                }}>
                {playersToShow.map((p: any, idx: number) => (
                    <MenuItem
                        key={idx}
                        value={idx}
                        sx={{
                            bgcolor: p.color || 'transparent',
                            color: getAccentColor(p.color),
                        }}>
                        {p.name}
                    </MenuItem>
                ))}
            </TextField>
            </Paper>
            <BottomBar>
                <Button
                    color="primary"
                    className={classes.buttonInput}
                    variant='contained'
                    onClick={onClick}>OK</Button>
            </BottomBar>
        </div>
    )
}