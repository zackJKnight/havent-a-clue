import { Chip, Grid } from "@mui/material";
import { ClueCard } from "./Model/ClueCard";
import {makeStyles} from "@mui/styles";
type Props = {
    class: string,
    card: ClueCard

}
const useStyles = makeStyles(() => ({
    chipCustom: {
        '& .MuiChip-label': {fontSize: 6}, // sub-selector
    },
}));

export default function ClueCardView(props: Props) {
    
    const customChipClass = useStyles();
    

    return (
        <Grid>
            <Grid item width={`100%`}>
            <img style={{ borderRadius: `50%`, width: `99%`, height: `99%`}} src={require(`./Images/${props.card.Name}.png`).default} alt={props.card.Name}></img>
            </Grid>
            {props.card.Category === 'scene' &&
            <Grid item alignContent="flex-end">
            <Chip className={customChipClass.chipCustom} label={props.card.Name}></Chip>
            </Grid>
}
        </Grid>
    );
}


