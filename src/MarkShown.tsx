import { Button, Card, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { ClueCard } from "./Model/ClueCard";


export default function MarkShown(props: any) {
    const history = useHistory();
    // TODO if player is you, show only cards from hand. cant show card if not in hand
    const [cards, setCards] = useState<Array<ClueCard>>(props.cards);
    let heldBy = parseInt(props.matchProps.match.params.showingPlayerId.replace(':', ''));
    let nextPlayerId = parseInt(props.matchProps.match.params.nextPlayerId.replace(':', ''));
    const [value] = useState<string>();
    
    function onOK() {
        let updatedCards = [...cards];
        updatedCards.forEach((item: ClueCard) => item.isSuggestion = false);
        setCards(updatedCards);
        history.push(`/turn:${nextPlayerId}`)
    }

    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>) {

        if (!event.target.checked) {
            heldBy = NaN;
        }

        let updatedCards = [...cards]
        updatedCards.filter((item: ClueCard) => item.Name === event.target.value)
            .forEach((item: ClueCard) => item.HeldBy = heldBy);
        setCards(updatedCards);
    }
    return (
        <><h1>Mark the Shown Card</h1>
            <RadioGroup value={value} onChange={toggleCardSelection} >
                <Card>
                    {props.cards?.filter((card: ClueCard) => card.isSuggestion).map((card: ClueCard) =>
                        <FormControlLabel key={card.Name} value={card.Name} control={<Radio />} label={card.Name} />
                    )}
                </Card>
            </RadioGroup>
            <Button variant='contained' onClick={onOK}>OK</Button>
        </>
    );
}