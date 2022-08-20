import { Chip, Grid, Typography } from "@mui/material";
import { ClueCard } from "./Model/ClueCard";

type Props = {
    class: string,
    card: ClueCard

}
export default function ClueCardView(props: Props) {

    return (
        <Grid>
            <Grid item width={`100%`}>
            <img style={{ borderRadius: `50%`, width: `99%`, height: `99%`}} src={require(`./Images/${props.card.Name}.png`).default} alt={props.card.Name}></img>
            </Grid>
            <Grid item>
            <Chip label={props.card.Name}></Chip>
            </Grid>
        </Grid>
    );
}


