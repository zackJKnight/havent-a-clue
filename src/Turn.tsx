import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { ClueCard } from "./Model/ClueCard";
import PickCards from "./PickCards";

export default function Turn(props: any) {
    const history = useHistory();

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
        
        // TODO if showing player is you, and suggestion contains one or
        // more of your held cards go to "mark card you showed"

        history.push(`/show:${suggestedBy}`);
    }
    // TODO make player have a color (like clue characters) style instead of heading
    // <playerWColor> suggests:

    //TODO disable suggest button until a card of each category is selected.
    return (
        <div>
            <h1>{`Mark Player ${suggestedBy + 1}'s Suggestion`}</h1>
            <div>
                <PickCards {...props} onChange={toggleCardSelection} />
            </div>
            <Button variant='contained' onClick={onSuggest}>Suggest</Button>
            <Button variant='contained'>Accuse</Button>
        </div>
    )
}