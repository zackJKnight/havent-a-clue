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
    const [game, setGame] = useState<Game>(props.game);
    const [disabled, setDisabled] = useState<boolean>(game.cards.filter(card => card.isSuggestion).length !== 3);
    const suggestedBy = parseInt(props.matchProps.match.params.playerId.replace(':', ''));

    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>, card: ClueCard) {
        if (!game.cards.map(card => card.Name).includes(event?.target?.value)) {
            return;
        }

        if (card === undefined) {
            const selectedCard = game.cards.find(card => card.Name === event?.target?.value);
            if (selectedCard !== undefined) {
                card = selectedCard;
            }
        }

        // limit choices to one per category

        let updatedCards = [...game.cards];
        updatedCards.filter(otherCard => otherCard.Category === card.Category)
            .forEach(item => item.isSuggestion = card.Name === item.Name);

        setGame({ ...game, cards: [...updatedCards] });
        setDisabled(updatedCards.filter(card => card.isSuggestion).length !== 3)
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

    return (
        <div className={classes.root}>
            <Typography variant='h3'>{`Player ${suggestedBy + 1}'s Suggestion`}</Typography>
            <div>
                <PickCards {...props} onChange={toggleCardSelection} />
            </div>
            <div className={classes.bottomButtonContainer}>
                <Button disabled={disabled} color="primary" className={classes.buttonInput} variant='contained' onClick={onSuggest}>Suggest</Button>
                <Button disabled={disabled} color="secondary" className={classes.buttonInput} variant='contained' onClick={onAccuse}>Accuse</Button>
                <Button className={classes.buttonInput} variant='contained' onClick={onSkip}>Skip</Button>
            </div>
        </div>
    )
}