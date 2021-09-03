import { Button } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { ClueCard } from "./Model/ClueCard";
import PickCards from "./PickCards";

export default function MarkShown (props:any){
    const history = useHistory();
    const [cards, setCards] = useState<Array<ClueCard>>(props.cards);
    let heldBy = parseInt(props.matchProps.match.params.showingPlayerId.replace(':', ''));

    function onOK() {
        history.push(`/turn:${heldBy}`)
    }

    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>, card: ClueCard) {
        
        if(!event.target.checked){
         heldBy = NaN;
        }
        let updatedCards = [...cards].filter((item: ClueCard) => item.Name !== card.Name);
        card.HeldBy = heldBy;
        updatedCards.push(card);
        setCards(updatedCards);
    }
    return(
<><h1>Mark the Card You've Been Shown</h1>
<PickCards {...props} onChange = {toggleCardSelection}/>
<Button onClick={onOK}>OK</Button>
</>
    );
}