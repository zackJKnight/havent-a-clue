import { Button } from "@material-ui/core";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ClueCard } from "./Model/ClueCard";

export default function Show(props: any) {

    const history = useHistory();
    const playerId = parseInt(props.matchProps.match.params.playerId.replace(':', ''));
    const playersAfter = props.game.players.slice(playerId);
    const playersBefore = props.game.players.slice(0, playerId);
    const playerTurnOrder = [...playersAfter, ...playersBefore];

    const [nextPlayerId, setNextPlayer] = useState({ ...playerTurnOrder[1] }.id);
    const [answeredNoLink] = useState(`/show:${playerId}`);
    const [cards, updateCards] = useState<Array<ClueCard>>(props.cards);

    function onYes() {
// if you are the suggesting player, render the pick component 
// and change question to `Pick the card player ${nextPlayerId + 1} showed.`

        // if no cards in the suggestion are known, mark them all as possibly shown by
        // and move to next turn

        // all state is on the list of cards for the app. maybe. let's see if setting state....
        // you porbably want to act on a temp list inside a function and set state when all decisions are made.
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
            tempCards.filter(card => card.Name === suggestions[0].Name)[0].HeldBy = nextPlayerId;

        } else {
            if (suggestions.length > 1) {
                tempCards.filter(card => suggestions.includes(card)).forEach(tempCard => {
                    tempCard.PossShownBy.push(parseInt(nextPlayerId));
                    tempCard.isSuggestion = false;
                });
            }
        }
        updateCards([...tempCards]);

        history.push(`/turn:${nextPlayerId}`);
    }

    function onNo() {

        let i = playerTurnOrder.indexOf(playerTurnOrder.filter(player => player.id === nextPlayerId)[0]);
        if (i + 1 > props.game.players.length - 1) {
            history.push(`/turn:${{ ...playerTurnOrder[1] }.id}`);
        } else {
            setNextPlayer(playerTurnOrder[i + 1].id);
            history.push(answeredNoLink);
        }

    }

    return (
        <>
            <h1>{`Did Player ${nextPlayerId + 1} show a card to player ${playerId + 1} ??`}</h1>
            
            <Button onClick={onYes}>Yes</Button>

            <Button onClick={onNo} >No</Button>
        </>
    )
}