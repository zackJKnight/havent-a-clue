import { Checkbox, Paper } from "@material-ui/core";
import { useState } from "react";
import { ClueCard } from "./Model/ClueCard";

export default function ClueCardView(props: any) {
    const [card] = useState<ClueCard>(props.card);
    return(
        <>
        <Paper className={props.class} style={{ background: `${card.BackgroundColor}` }}>
                    <Checkbox onChange={(e) => props.onChange(e, card)}></Checkbox>
                    {props.card.Name}
                </Paper>
        </>
    );
}