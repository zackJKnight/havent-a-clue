import { Button, Card, FormControlLabel, Paper, Radio, RadioGroup } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { ClueCard } from "./Model/ClueCard";
import { useStyles } from "./Utils/Styles";
import { Game } from "./Model/Game";

export default function MarkShown(props: any) {
    const history = useHistory();
    const classes = useStyles();

    // TODO if player is you, show only cards from hand. cant show card if not in hand
    const game: Game = props.game;
    const [cards, updateCards] = useState<Array<ClueCard>>(props.cards);
    let heldBy = props.showingPlayerId; //parseInt(props.matchProps.match.params.showingPlayerId.replace(':', ''));
    //let nextPlayerId = props.nextPlayerId; //parseInt(props.matchProps.match.params.nextPlayerId.replace(':', ''));
    const [value, setValue] = useState('');
    const playerId = props.showingPlayerId;
    const playersAfter = props.game.players.slice(playerId);
    const playersBefore = props.game.players.slice(0, playerId);
    const playerTurnOrder = [...playersAfter, ...playersBefore];

    const [nextPlayerId] = useState({ ...playerTurnOrder[1] }.id);
    const [showingPlayerId, setShowingPlayer] = useState({ ...playerTurnOrder[1] }.id);

    const [answeredNoLink] = useState(`/show:${playerId}`);

    function onOK() {
        if (value === 'None') {
            onNo();
        } else {
            onYes();
        }
    }

    function onNo() {

        // add the Showing Player to the NotHeldby array of the isSuggestion cards.
        const tempCards = [...cards];
        tempCards.forEach(card => {
            if (card.isSuggestion) {
                card.NotHeldBy.push(showingPlayerId);
            }
        });
        updateCards([...tempCards]);

        let showingPlayerIndex = playerTurnOrder.indexOf(playerTurnOrder.filter(player => player.id === showingPlayerId)[0]);

        const nextShowingPlayerIndex = showingPlayerIndex + 1;

        // increment showing player- current showing player did not show a card
        if (playerTurnOrder[nextShowingPlayerIndex]) {
            setShowingPlayer(playerTurnOrder[nextShowingPlayerIndex].id);
        }
        // if this is the last showing player - noone has shown
        if (nextShowingPlayerIndex > props.game.players.length - 1) {
            noteKnownSolutionCards();
            clearSuggestions();
            history.push(`/turn:${nextPlayerId}`);
        } else {
            history.push(answeredNoLink);
        }

    }

    function onYes() {
        // if no cards in the suggestion are known, mark them all as 'possibly shown by'
        // and move to next turn

        const tempCards = [...cards];
        const suggestions: Array<ClueCard> = tempCards.filter(card => card.isSuggestion);
        for (let card of suggestions) {
            if (!isNaN(card.HeldBy)) {
                const cardIndex = suggestions.indexOf(card);
                const knownCard = suggestions.splice(cardIndex, 1);
                tempCards.forEach((card: ClueCard) => {
                    if (card.Name === knownCard[0].Name) {
                        card.isSuggestion = false;
                    }
                })
            }
        }
        if (suggestions.length === 1) {
            // if only one card is not known as held, that card is held by the showing player
            tempCards.filter(card => card.Name === suggestions[0].Name)[0].HeldBy = showingPlayerId;

        } else {
            if (suggestions.length > 1) {
                tempCards.filter(card => suggestions.includes(card)).forEach(tempCard => {
                    tempCard.PossShownBy.push(parseInt(showingPlayerId));
                });
            }
        }
        updateCards([...tempCards]);

        clearSuggestions();

        history.push(`/turn:${nextPlayerId}`);
    }

    function noteKnownSolutionCards() {
        // if the NOT_HELD_BY list for a card contains all players,
        // mark as a known accusation.
        let updatedCards = [...cards];
        updatedCards.forEach((item: ClueCard) => {
            if (props.game.players.length === item.NotHeldBy.length) {
                item.isSolution = true;
            }
        });
        updateCards(updatedCards);
    }

    function clearSuggestions() {
        let updatedCards = [...cards];
        updatedCards.forEach((item: ClueCard) => item.isSuggestion = false);
        updateCards(updatedCards);
    }

    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>) {
if(event === undefined){
    return;
}
        setValue(event?.target?.value);
        // now that markshown has moved into show, the onNo logic goes here when 
        // the 'none' radio is selected.

        if (!event.target.checked) {
            heldBy = NaN;
        }

        let updatedCards = [...cards]
        updatedCards.filter((item: ClueCard) => item.Name === event.target.value)
            .forEach((item: ClueCard) => item.HeldBy = heldBy);
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