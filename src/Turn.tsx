import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { ClueCard } from "./Model/ClueCard";
import PickCards from "./PickCards";
import { useStyles } from "./Utils/Styles";
import { Game } from "./Model/Game";

export default function Turn(props: any) {
    const history = useHistory();
    const classes = useStyles();
    const [game] = useState<Game>(props.game);
    const [cards, setCards] = useState<Array<ClueCard>>(props.cards);
    const suggestedBy = parseInt(props.matchProps.match.params.playerId.replace(':', ''));

    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>, card: ClueCard) {
        if (!cards.map(card => card.Name).includes(event?.target?.value)) {
            return;
        }
        if (card === undefined) {
            const selectedCard = cards.find(card => card.Name === event?.target?.value);
            if (selectedCard !== undefined) {
                card = selectedCard;
            }
        }
        let tempSuggestor = suggestedBy;
        // limit choices to one per category

        let updatedCards = [...cards].filter((item: ClueCard) => item?.Name !== card.Name);
        updatedCards.filter(otherCard => otherCard.Category === card.Category
            && otherCard.Name !== card.Name).forEach(card => card.isSuggestion = false);
        if (!event.target.checked) {
            tempSuggestor = NaN;
            card.isSuggestion = false;

        }

        if (!isNaN(tempSuggestor)) {
            card.isSuggestion = true;
        }
        updatedCards.push(card);
        setCards(updatedCards);
    }

    function onSuggest() {

        // TODO if showing player is you, set card shown as shown to another player

        history.push(`/show:${suggestedBy}`);
    }

    const onSkip = () => {
        history.push(`/turn:${(suggestedBy + 1) % game.players.length}`);
    }

    const onAccuse = () => {
        history.push(`/accuse:${suggestedBy}`);
    }
    // TODO make player have a color (like clue characters) style instead of heading
    // <playerWColor> suggests:

    //TODO disable suggest button until a card of each category is selected.
    return (
        <div className={classes.root}>
            <Typography variant='h3'>{`Player ${suggestedBy + 1}'s Suggestion`}</Typography>
            <div>
                <PickCards {...props} onChange={toggleCardSelection} />
            </div>
            <div className={classes.bottomButtonContainer}>
                <Button color="primary" className={classes.buttonInput} variant='contained' onClick={onSuggest}>Suggest</Button>
                <Button color="secondary" className={classes.buttonInput} variant='contained' onClick={onAccuse}>Accuse</Button>
                <Button className={classes.buttonInput} variant='contained' onClick={onSkip}>Skip</Button>
            </div>
        </div>
    )
}