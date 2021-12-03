import { Button, MenuItem, Paper, TextField, Typography } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { Game } from "./Model/Game";
import NumberSelectList from "./Utils/NumberSelection";
import { useHistory } from "react-router-dom";
import { useStyles } from "./Utils/Styles";

export default function WhichPlayer(props: any) {
    const history = useHistory();
    const classes = useStyles();
    const playerCount = parseInt(props.match.params.playerCount.replace(':', ''));
    const [mainPlayerId, setPlayerId] = useState(0);
    const [game, setGame] = useState<Game>(props.game);

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPlayerId(parseInt(e.target.value) - 1)
        let tempGame: Game = game;
        tempGame.mainPlayerId = parseInt(e.target.value) - 1;
        setGame({ ...game, ...tempGame });
    }
    function onClick() {
        history.push(`/hand:${mainPlayerId}`);
    }

    const numbers = NumberSelectList(playerCount);

    return (
        <div className={classes.root}>
            <Typography variant='h3'>Which Player Are You?
            </Typography>
            <TextField
                className={classes.numberSelect}
                type="number"
                select
                value={mainPlayerId + 1}
                onChange={handleNumberChange}

                InputProps={{
                    inputProps: {
                        defaultValue: 1, min: 1, max: playerCount
                    }
                }} >
                {numbers.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <div className={classes.bottomButtonContainer}>
                <Button
                    color="primary"
                    className={classes.buttonInput}
                    variant='contained'
                    onClick={onClick}>OK</Button>
            </div>
        </div>
    )
}