import { FormControlLabel, Paper } from "@material-ui/core";
import { ReactElement } from "react";
import { ClueCard } from "./Model/ClueCard";

type Props = {
    class: string,
    card: ClueCard,
    control: ReactElement,
    onChange: any

}
export default function ClueCardView(props: Props) {
   
        return (
        <Paper className={props.class} style={{ background: `${getClueCardBackgroundColor(props.card)}`, opacity: 0.8 }}>
            <img style={{borderRadius: `50%`, width: `35%`, height: `35%`}} src={require(`./Images/${props.card.Name}.png`).default} alt={props.card.Name}></img>
            <FormControlLabel key={props.card.Name} value={props.card.Name} control={props.control} label={''} onChange={props.onChange} />
        </Paper>
    );
}

const getClueCardBackgroundColor = (card: ClueCard): string => {

    if (card === undefined) {
        return '';
    }

    if (card.isSolution) {
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
    const startGradientColor = '#f0f0f0';
    const endGradientColor = '#0c0c0c';
    return `linear-gradient(45deg, ${startGradientColor} ${100 - gradientPercent}%, ${endGradientColor} ${gradientPercent}%)`;
}
