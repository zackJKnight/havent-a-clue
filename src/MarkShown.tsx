import { Button, Card, FormControlLabel, Paper, Radio, RadioGroup } from "@material-ui/core";
import { ClueCard } from "./Model/ClueCard";
import { useStyles } from "./Utils/Styles";
import { Game } from "./Model/Game";
import { ChangeEvent, useState } from "react";

export default function MarkShown(props: any) {
    const classes = useStyles();

    // TODO if player is you, show only cards from hand. cant show card if not in hand
    const game: Game = props.game;
    const [cards, updateCards] = useState(props.cards);
    //let nextPlayerId = props.nextPlayerId; //parseInt(props.matchProps.match.params.nextPlayerId.replace(':', ''));
    const [value, setRadioValue] = useState(props.radioValue);

    function onOK() {
        if (value === 'None') {
            props.onNoneShown();
        } else {
            props.onCardShown();
        }
    }

    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>) {
        if (event === undefined) {
            return;
        }
        setRadioValue(event?.target?.value);
        // now that markshown has moved into show, the onNo logic goes here when 
        // the 'none' radio is selected.

        if (!event.target.checked) {
            props.setShowingPlayer(NaN);
        }

        let updatedCards = [...cards]
        updatedCards.filter((item: ClueCard) => item.Name === event.target.value)
            .forEach((item: ClueCard) => item.HeldBy = props.showingPlayerId);
        updateCards(updatedCards);
    }
    return (
        <>
            <Paper className={classes.root}>
                <RadioGroup value={value} onChange={toggleCardSelection} >
                    <Card>
                        {props.cards?.filter((card: ClueCard) => card.isSuggestion
                            && card.HeldBy !== game.mainPlayerId).map((card: ClueCard) =>
                                <FormControlLabel key={card.Name} value={card.Name} control={<Radio />} label={card.Name} />
                            )}
                        <FormControlLabel key={'none'} value={'None'} control={<Radio />} label={'None'} />
                    </Card>
                </RadioGroup>
            </Paper>
            <Button variant='contained' className={classes.buttonInput} onClick={onOK}>OK</Button>
        </>
    );
}