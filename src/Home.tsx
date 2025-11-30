import { Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "./Model/Game.ts";
import { Player } from "./Model/Player.ts";
import { CardData } from "./Utils/CardData.ts";
import NumberSelectList from "./Utils/NumberSelection.ts";
import { useStyles } from "./Utils/Styles.ts";
import BottomBar from "./components/BottomBar.tsx";
import homeImgUrl from './Images/220px-WhoShotMrBurnsclue.png';

export default function Home(props: { playerCount: number, maxPlayers: number, game: Game, setPlayers: any }) {
    const history = useNavigate();
    const classes = useStyles();
    const [game, setGame] = useState<Game>(props.game);
    const [count, setCount] = useState(props.playerCount);
    const players = CardData.suspects.sort((a, b) => a.turn - b.turn);
    const handleNumberChange = (e: any) => {
        const playerCount = Number(e.target.value);
        let tempGame: Game = { ...game };
        tempGame.players = [];
        for (let i = 0; i < playerCount; i++) {
            tempGame.players.push(new Player(i, players[i]?.color, players[i]?.labelName));
        }
        
        setGame({ ...tempGame });
        props.setPlayers({ ...tempGame });
        setCount(e?.target?.value);
    }

    const numbers = NumberSelectList(props.maxPlayers);

    function onClick() {
        history(`/which/${count}`)
    }

    return (
        <div className={classes.root}>
            <Typography variant={'h3'}>A body has been found!</Typography>
            <img src={homeImgUrl}
                alt={'A body has been found'}
                className={classes.homeImage}></img>
            <Typography variant={'h3'}>How Many Clue Players?</Typography>
            <Paper className={classes.root}>
                <TextField
                    className={classes.numberSelect}
                    select
                    value={String(count)}
                    onChange={handleNumberChange}
                    >
                    {numbers.map((option) => (
                        <MenuItem key={option.value} value={String(option.value)}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Paper>
            <BottomBar>
                <Button
                    color="primary"
                    className={classes.buttonInput}
                    variant='contained'
                    onClick={onClick} >OK</Button>
            </BottomBar>
        </div>
    )
}