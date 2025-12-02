import { Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "./Model/Game.ts";
import { Player } from "./Model/Player.ts";
import NumberSelectList from "./Utils/NumberSelection.ts";
import { useStyles } from "./Utils/Styles.ts";
import BottomBar from "./components/BottomBar.tsx";
import { useVariantContext } from "./context/VariantContext.tsx";

export default function Home(props: { playerCount: number, maxPlayers: number, game: Game, setPlayers: any }) {
    const history = useNavigate();
    const classes = useStyles();
    const [game, setGame] = useState<Game>(props.game);
    const [count, setCount] = useState(props.playerCount);
    const { cardData, copy, variant } = useVariantContext();
    const players = [...cardData.suspects].sort((a, b) => (a.turn || 0) - (b.turn || 0));

    // keep local state in sync when variant or upstream game changes
    useEffect(() => {
        setGame(props.game);
        setCount(props.playerCount);
    }, [props.game, props.playerCount]);
    const handleNumberChange = (e: any) => {
        const playerCount = Number(e.target.value);
        let tempGame: Game = { ...game };
        tempGame.players = [];
        for (let i = 0; i < playerCount; i++) {
            const fallbackName = players[i]?.labelName || players[i]?.displayName || `Player ${i + 1}`;
            tempGame.players.push(new Player(i, players[i]?.color || '#777', fallbackName));
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
            <Typography variant={'h3'}>{copy.homeHeadline}</Typography>
            <img src={variant.homeImage}
                alt={copy.homeImageAlt}
                className={classes.homeImage}></img>
            <Typography variant={'h3'}>{copy.playerCountPrompt}</Typography>
            <Paper className={classes.homeCard}>
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
