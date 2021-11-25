import { Typography } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import MarkShown from "./MarkShown";
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
    const [radioValue] = useState('None');

    const [cards, updateCards] = useState<Array<ClueCard>>(props.cards);
    const [game] = useState<Game>(props.game);

    const [answeredNoLink] = useState(`/show:${playerId}`);


    function onNoneShown() {

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

    function onCardShown(radioValue: string) {

        // if one of the suggestions is held, clear and move on


        // if no cards in the suggestion are known, mark them all as 'possibly shown by'
        // and move to next turn

        const tempCards = [...cards];
        const suggestions: Array<ClueCard> = tempCards.filter(card => card.isSuggestion);

        if (suggestions.filter(card => !(isNaN(card.HeldBy))).length === 1 &&
            radioValue.toLocaleLowerCase() !== 'a card') {
            clearSuggestions();
            history.push(`/turn:${nextPlayerId}`);
            return;
        }

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
        } else if (suggestions.length > 1) {
            tempCards.filter(card => suggestions.includes(card)).forEach(tempCard => {
                tempCard.PossShownBy.push(parseInt(showingPlayerId));
            });
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

    return (
        <>
            <Typography variant='h3'>{`Shown by player ${showingPlayerId + 1} to player ${playerId + 1}`}</Typography>
            <MarkShown
                game={game}
                cards={cards}
                showingPlayerId={showingPlayerId}
                setShowingPlayer={setShowingPlayer}
                playerId={playerId}
                onNoneShown={onNoneShown}
                onCardShown={onCardShown}
                radioValue={radioValue} />
        </>
    )
}
