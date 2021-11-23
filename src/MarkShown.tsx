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
    const [value, setRadioValue] = useState(props.radioValue);
    const [playerId] = useState(props.playerId);

    function onOK() {
        if (value === 'None') {
            props.onNoneShown();
        } else {
            // if card is suggestion and not event value and held by is props.showingPlayerId
            // set HeldBy to NaN? in some cases, this could be a false
            let updatedCards = [...cards]
            updatedCards.filter((item: ClueCard) => item.Name === value)
                .forEach((item: ClueCard) => item.HeldBy = props.showingPlayerId);
            updateCards(updatedCards);
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

        // does this still apply? this was added when it was a checkbox
        if (!event.target.checked) {
            props.setShowingPlayer(NaN);
        }

    }
    return (
        <div className={classes.root}>
            <RadioGroup className={classes.radioGroup} value={value} onChange={toggleCardSelection} >
                <Card>
                    {playerId === game.mainPlayerId &&
                        props.cards?.filter((card: ClueCard) => card.isSuggestion
                            && card.HeldBy !== game.mainPlayerId).map((card: ClueCard) =>
                                <FormControlLabel key={card.Name} value={card.Name} control={<Radio />} label={card.Name} />
                            )}
                    {playerId !== game.mainPlayerId &&
                        <FormControlLabel key={'aCard'} value={'a Card'} control={<Radio />} label={'A Card'} />
                    }
                    <FormControlLabel key={'none'} value={'None'} control={<Radio />} label={'None'} />
                </Card>
            </RadioGroup>
            <Button variant='contained' className={classes.buttonInput} onClick={onOK}>OK</Button>
        </div>
    );
}