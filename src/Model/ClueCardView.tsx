import { Checkbox, Paper } from "@material-ui/core";

export default function ClueCardView(props: any) {

    return(
        <>
        <Paper className={props.class} style={{ background: `${(props.bgcolor(props.card))()}` }}>
                    <Checkbox onChange={(e) => props.onChange(e, props.card)}></Checkbox>
                    {props.card.Name}
                </Paper>
        </>
    );
}