import { Button } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { ClueCard } from "./Model/ClueCard";
import PickCards from "./PickCards";


export default function PickHand(props:any) {
    const [cards, setCards] = useState<Array<ClueCard>>(props.cards);

    // Set the HeldBy or ShownBy property of the card with the checked checkbox
    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>, card: ClueCard) {
        let heldBy = parseInt(props.matchProps.match.params.playerId.replace(':', ''));
        if(!event.target.checked){
         heldBy = NaN;
        }
        let updatedCards = [...cards].filter((item: ClueCard) => {
            if (item.Name !== card.Name) {
                return item;
            }
        });
        card.HeldBy = heldBy;
        updatedCards.push(card);
        setCards(updatedCards);
    }
    
    return(
    <>
    <h1>Pick the cards in your hand.</h1>
    <PickCards {...props} onChange = {toggleCardSelection}/>
    <Button>OK</Button>
    </>
    );
}
