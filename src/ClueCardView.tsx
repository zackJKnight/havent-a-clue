import { Checkbox, Paper } from "@material-ui/core";
import { useState } from "react";
import { ClueCard } from "./Model/ClueCard";

export default function ClueCardView(props: any) {
    const [card] = useState<ClueCard>(props.card);
    return(
        <Paper className={props.class} style={{ background: `${getClueCardBackgroundColor(props.card)}` }}>
            <Checkbox onChange={(e) => props.onChange(e, card)}/>
            {props.card.Name}
        </Paper>
    );
}

const getClueCardBackgroundColor = (card: ClueCard): string => {

    if (card === undefined) {
        return '';
    }

    if(card.isSolution){
        return 'green';
    }

    if (!isNaN(card.HeldBy)) {
    // TODO color heldby per player
        return 'gray';
    }

    if (card.PossShownBy?.length === 0) {
        return '';
    }
    
    let gradientPercent = ((card.PossShownBy?.length || 0) / .1);

    return `linear-gradient(45deg, #f78da7 ${100 - gradientPercent}%, #b80000 ${gradientPercent}%)`;
}
