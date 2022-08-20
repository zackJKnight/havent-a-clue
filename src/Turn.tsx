import { Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import PickCards from "./PickCards";
import { useStyles } from "./Utils/Styles";
import { Game } from "./Model/Game";

export default function Turn(props: any) {
    const history = useHistory();
    const classes = useStyles();
    const [game, setGame] = useState<Game>(props.game);
    const [disabled, setDisabled] = useState<boolean>(game.cards.filter(card => card.isSuggestion).length !== 3);
    const suggestedBy = parseInt(props.matchProps.match.params.playerId.replace(':', ''));

    function toggleCardSelection(cardNames: string[]) {
if(!cardNames) {
    return;
}
        // limit choices to one per category

        let updatedCards = [...game.cards];

        updatedCards.forEach(item => item.isSuggestion = cardNames.includes(item.Name));

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