import { Button } from "@material-ui/core";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ClueCard } from "./Model/ClueCard";
import { Game } from "./Model/Game";

export default function Show(props: any) {

    const history = useHistory();
    const playerId = parseInt(props.matchProps.match.params.playerId.replace(':', ''));
    const playersAfter = props.game.players.slice(playerId);
    const playersBefore = props.game.players.slice(0, playerId);
    const playerTurnOrder = [...playersAfter, ...playersBefore];

    const [nextPlayerId] = useState({ ...playerTurnOrder[1] }.id);
    const [showingPlayerId, setShowingPlayer] = useState({ ...playerTurnOrder[1] }.id);

    const [answeredNoLink] = useState(`/show:${playerId}`);
    const [cards, updateCards] = useState<Array<ClueCard>>(props.cards);
    const [game] = useState<Game>(props.game);

    function onYes() {
        // if it's your turn, render the pick component 
        // and change question to `Pick the card player ${nextPlayerId + 1} showed.`
        if (playerId === game.mainPlayerId || showingPlayerId === game.mainPlayerId) {
            history.push(`/mark:${showingPlayerId}/${nextPlayerId}`);
            return;
        }

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
        setShowingPlayer(playerTurnOrder[nextShowingPlayerIndex].id);

        // if this is the last showing player - noone has shown
        if (nextShowingPlayerIndex > props.game.players.length - 1) {
// TODO if noone shows the suggestor a card, no other player has any of the suggested cards. 
// EITHER all suggested cards are the solution OR the suggestor has one or more cards
// the unheld cards must be marked as NOT_HELD_BY. 
// if the NOT_HELD_BY list for a card contains all players, it is 
// and should be marked as a known accusation.

            clearSuggestions();
            history.push(`/turn:${nextPlayerId}`);
        } else {
            history.push(answeredNoLink);
        }

    }

    function clearSuggestions() {
        let updatedCards = [...cards];
        updatedCards.forEach((item: ClueCard) => item.isSuggestion = false);
        updateCards(updatedCards);
    }

    return (
        <>
            <h1>{`Did Player ${showingPlayerId + 1} show a card to player ${playerId + 1} ??`}</h1>

            <Button variant='contained' onClick={onYes}>Yes</Button>

            <Button variant='contained' onClick={onNo} >No</Button>
        </>
    )
}