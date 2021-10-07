import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { ClueCard } from "./Model/ClueCard";
import { Game } from "./Model/Game";
import PickCards from "./PickCards";

export default function Turn(props: any) {
    const [cards, setCards] = useState<Array<ClueCard>>(props.cards);
    const suggestedBy = parseInt(props.matchProps.match.params.playerId.replace(':', ''));

    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>, card: ClueCard) {

        // move this logic to show?
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
// TODO make player have a color (like clue characters) style instead of heading
// <playerWColor> suggests:
    return (
        <div>
            <h1>{`Mark Player ${suggestedBy + 1}'s Suggestion`}</h1>

            <div>
                <PickCards {...props} onChange={toggleCardSelection} />
            </div>
            
            <Link to={`/show:${suggestedBy}`}>
                <Button variant='contained'>Suggest</Button>
            </Link>
            <Button variant='contained'>Accuse</Button>
        </div>
    )
}