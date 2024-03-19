import { Typography } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ClueCard } from "./Model/ClueCard.ts";
import { Game } from "./Model/Game.ts";
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useStyles } from "./Utils/Styles.ts";
import { ChangeEvent } from "react";
import { getClueCardHints } from "./hooks/use-clue-card-hints.ts";

export default function Show(props: any) {
    const history = useHistory();
    //const playerId = parseInt(useParams());
    const [playerId] = useState(parseInt(props.matchProps.match.params.playerId.replace(':', '')));
    const playersAfter = props.game.players.slice(playerId);
    const playersBefore = props.game.players.slice(0, playerId);
    const playerTurnOrder = [...playersAfter, ...playersBefore];
    const [nextPlayerId] = useState({ ...playerTurnOrder[1] }.id);
    const [showingPlayerId, setShowingPlayer] = useState({ ...playerTurnOrder[1] }.id);
    const [radioValue] = useState('None');
    const [game, setGame] = useState<Game>(props.game);
    const showingPlayerIndex = playerTurnOrder.indexOf(playerTurnOrder.filter(player => player.id === showingPlayerId)[0]);
    const classes = useStyles();

    const [value, setRadioValue] = useState(radioValue);
    const nextShowingPlayerIndex = showingPlayerIndex + 1;
    const [answeredNoLink] = useState(`/show:${playerId}`);

    function onOK() {
        if (value === 'None') {
            onNoneShown();
        } else {
            // if card is suggestion and not event value and held by is props.showingPlayerId
            // set HeldBy to NaN? in some cases, this could be a false
            if (value?.toLocaleLowerCase() !== 'a card') {
                let updatedCards = [...game.cards]
                updatedCards.filter((item: ClueCard) => item.Name === value)
                    .forEach((item: ClueCard) => item.HeldBy = showingPlayerId);
                setGame({ ...game, cards: [...updatedCards] });
            }
            onCardShown(value);
        }
    }

    function onNoneShown() {

        // add the Showing Player to the NotHeldby array of the isSuggestion cards.
        const updatedCards = [...game.cards];
        updatedCards.forEach(card => {
            if (card.isSuggestion) {
                card.NotHeldBy.push(showingPlayerId);
            }
        });
        setGame({ ...game, cards: [...updatedCards] });

        // increment showing player- current showing player did not show a card
        if (playerTurnOrder[nextShowingPlayerIndex]) {
            setShowingPlayer(playerTurnOrder[nextShowingPlayerIndex].id);
        }
        // if this is the last showing player - noone has shown
        if (nextShowingPlayerIndex > game.players.length - 1) {
            noteKnownSolutionCards();
            clearSuggestions();
            history.push(`/turn:${nextPlayerId}`);
        } else {
            history.push(answeredNoLink);
        }

    }

    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>) {
        if (event === undefined) {
            return;
        }
        const card = game.cards.find(card => card.Name === event?.target?.value);

        let updatedCards = [...game.cards];
        updatedCards.filter(otherCard => otherCard.Category === card?.Category)
            .forEach(item => item.isSuggestion = card?.Name === item.Name);

        setRadioValue(event?.target?.value);
        // now that markshown has moved into show, the onNo logic goes here when 
        // the 'none' radio is selected.

        // does this still apply? this was added when it was a checkbox
        if (!event.target.checked) {
            setShowingPlayer(NaN);
        }
    }

    function onCardShown(radioValue: string) {

        // if one of the suggestions is held, clear and move on

        // if no cards in the suggestion are known, mark them all as 'possibly shown by'
        // and move to next turn

        const tempCards = [...game.cards];
        const suggestions: Array<ClueCard> = tempCards.filter(card => card.isSuggestion);
        // bug - radioValue will be a card name when showing player is you
        if (suggestions.filter(card => !(isNaN(card.HeldBy))).length === 1 &&
            radioValue.toLocaleLowerCase() !== 'a card') {
            noteKnownSolutionCards();
            clearSuggestions();
            history.push(`/turn:${nextPlayerId}`);
            return;
        }

        let remainingSuggestions = Array<ClueCard>();
        for (let card of suggestions) {
            //  add the remainingSuggestions to a separate array.
            // use to deduce known cards
            const cardIndex = suggestions.indexOf(card);
            const knownCard = suggestions.slice(cardIndex, cardIndex + 1)[0];

            if (isNaN(card.HeldBy)) {
                remainingSuggestions.push(knownCard);
            }
            tempCards.forEach((card: ClueCard) => {
                if (card.Name === knownCard.Name) {
                    card.isSuggestion = false;
                }
            })
        }

        if (remainingSuggestions.length === 1 &&
            radioValue.toLocaleLowerCase() === 'a card') {
            // if only one card is not known as held, that card is held by the showing player
            tempCards.filter(card => card.Name === remainingSuggestions[0].Name)[0].HeldBy = showingPlayerId;
        } else if (remainingSuggestions.length > 1) {
            tempCards.filter(card => suggestions.includes(card)).forEach(tempCard => {
                tempCard.PossShownBy.push(parseInt(showingPlayerId));
            });
        }

        setGame({ ...game, cards: [...tempCards] });
        noteKnownSolutionCards();
        clearSuggestions();

        history.push(`/turn:${nextPlayerId}`);
    }

    function noteKnownSolutionCards() {
        // if the NOT_HELD_BY list for a card contains all players,
        // mark as a known accusation.
        let updatedCards = [...game.cards];
        updatedCards.forEach((item: ClueCard) => {
            if (game.players.length === item.NotHeldBy.length) {
                item.isSolution = true;
            }
        });

        // if all but one cards of a category are known, mark remaining card as a known solution

        let categoryArrays = [];
        let categories = [...new Set(updatedCards.map(card => card.Category))];
        for (let i = 0; i < categories.length; i++) {
            categoryArrays.push(updatedCards.filter(card => card.Category === categories[i]));
        }

        categoryArrays.forEach((categoryArray: Array<ClueCard>) => {
            if (categoryArray.filter(item => isNaN(item.HeldBy)).length === 1) {
                const solutionCardName = categoryArray.filter(item => isNaN(item.HeldBy))[0].Name;
                updatedCards.filter(card => card.Name === solutionCardName)[0].isSolution = true;
            }
        }
        );
        updatedCards = getClueCardHints(updatedCards, game.players);
         setGame({ ...game, cards: [...updatedCards] });
    }

    function clearSuggestions() {
        let updatedCards = [...game.cards];
        updatedCards.forEach((item: ClueCard) => item.isSuggestion = false);
         setGame({ ...game, cards: [...updatedCards] });
    }

    const shownBy = game.mainPlayerId === showingPlayerId ? 'You' : game.players[showingPlayerId].name;
    const whom = game.mainPlayerId === playerId ? 'You' : game.players[playerId].name;

    return (
        <>
            <Typography variant='h3'>{`Shown by ${shownBy} to ${whom}`}</Typography>
            <FormControl component="fieldset">
                <RadioGroup className={classes.radioGroup} value={value} onChange={toggleCardSelection} >
                    {(showingPlayerId === game.mainPlayerId || playerId === game.mainPlayerId) &&
                        game.cards?.filter((card: ClueCard) => card.isSuggestion
                            && (showingPlayerId === game.mainPlayerId ? (card.HeldBy === game.mainPlayerId) : (card.HeldBy !== game.mainPlayerId)))
                            .map((card: ClueCard) =>
                                <FormControlLabel key={card.Name} value={card.Name} control={<Radio />} label={card.Name} />
                            )
                    }
                    {(showingPlayerId !== game.mainPlayerId && playerId !== game.mainPlayerId) &&
                        <FormControlLabel key={'aCard'} value={'a Card'} control={<Radio />} label={'A Card'} />
                    }
                    <FormControlLabel key={'none'} value={'None'} control={<Radio />} label={'None'} />
                </RadioGroup>
            </FormControl>
            <div className={classes.bottomButtonContainer}>
                <Button color='primary' variant='contained' className={classes.buttonInput} onClick={onOK}>OK</Button>
            </div>
        </>
    )
}
