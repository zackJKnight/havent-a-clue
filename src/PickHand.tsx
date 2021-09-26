import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { ChangeEvent, useState } from "react";
import { ClueCard } from "./Model/ClueCard";
import PickCards from "./PickCards";


export default function PickHand(props: any) {
    const [cards, setCards] = useState<Array<ClueCard>>(props.cards);
    let heldBy = parseInt(props.matchProps.match.params.playerId.replace(':', ''));

    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>, card: ClueCard) {
        
        if(card === undefined){
            return;
        }
        if (!event.target.checked) {
            heldBy = NaN;
        }
        let updatedCards = [...cards].filter((item: ClueCard) => item.Name !== card.Name);
        card.HeldBy = heldBy;
        updatedCards.push(card);
        setCards([...updatedCards]);
    }

    function onOK() {
        // add the player to the NotHeldby array of all unselected cards.
        const tempCards = [...cards];
        tempCards.forEach(card => {
            if (card.HeldBy !== heldBy) {
                card.NotHeldBy.push(heldBy);
            }
        });
        setCards([...tempCards]);
    }

    return (
        <>
            <h1>Pick cards in your hand</h1>
            <PickCards {...props} onChange={toggleCardSelection} />
            <Link to={`/turn:${0}`}>
                <Button variant='contained' onClick={onOK}>OK</Button>
            </Link>
        </>
    );
}
