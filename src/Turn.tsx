import { Button } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { ClueCard } from "./Model/ClueCard";
import { Game } from "./Model/Game";
import PickCards from "./PickCards";

export default function Turn(props: any) {
    const [cards, setCards] = useState<Array<ClueCard>>(props.cards);
    const [game, setGame] = useState<Game>(props.game);
    
    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>, card: ClueCard) {
        
        // limit choices to one per category
        let suggestedBy = parseInt(props.matchProps.match.params.playerId.replace(':', ''));
        if(!event.target.checked){
          suggestedBy = NaN;
        }
        let updatedCards = [...cards].filter((item: ClueCard) => {
            if (item.Name !== card.Name) {
                return item;
            }
        });
        if(!isNaN(suggestedBy)){
        card.SuggestedBy.push({playerId: suggestedBy, inRound: game.round});
        }
        updatedCards.push(card);
        setCards(updatedCards);
    }

return(
    <>
    <h1>`Mark Player's Suggestion`</h1>
    <PickCards {...props} onChange = {toggleCardSelection}/>
    <Button>Suggest</Button>
    <Button>Accuse</Button>
    </>
)
}