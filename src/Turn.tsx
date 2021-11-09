import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { ClueCard } from "./Model/ClueCard";
import PickCards from "./PickCards";
import { useStyles } from "./Utils/Styles";

export default function Turn(props: any) {
    const history = useHistory();
    const classes = useStyles();

    const [cards, setCards] = useState<Array<ClueCard>>(props.cards);
    const suggestedBy = parseInt(props.matchProps.match.params.playerId.replace(':', ''));

    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>, card: ClueCard) {

        let tempSuggestor = suggestedBy;
        // limit choices to one per category

        let updatedCards = [...cards].filter((item: ClueCard) => item.Name !== card.Name);

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
        history.push(`/turn:${suggestedBy}`);
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
            <Button variant='contained' onClick={onSuggest}>Suggest</Button>
            <Button variant='contained' onClick={onSkip}>Skip</Button>
        </div>
    )
}