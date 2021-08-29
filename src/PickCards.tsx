import { Checkbox, Grid, Paper } from "@material-ui/core";
import { ClueCard } from "./Model/ClueCard";
import { makeStyles } from '@material-ui/core/styles';

let cardElements: any[];

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "lg"
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function PickCards(props: any) {
    const classes = useStyles();
    let tempElements = [];
    tempElements.push(props.cards?.filter((card: ClueCard) => card.Category === 'suspect')
    .map((card: ClueCard, i: number) =>
        <Grid item key={card.Name} spacing={3}>
            <Paper className={classes.paper}>
                <Checkbox onChange={(e) => props.onChange(e, card)}></Checkbox>
                {card.Name}
            </Paper>
        </Grid>
    ));
    tempElements.push(props.cards?.filter((card: ClueCard) => card.Category === 'weapon')
    .map((card: ClueCard, i: number) =>
        <Grid item key={card.Name} >
            <Paper className={classes.paper}>
                <Checkbox onChange={(e) => props.onChange(e, card)}></Checkbox>
                {card.Name}
            </Paper>
        </Grid>
    ));
    tempElements.push(props.cards?.filter((card: ClueCard) => card.Category === 'scene')
    .map((card: ClueCard, i: number) =>
        <Grid item key={card.Name}>
            <Paper className={classes.paper}>
                <Checkbox onChange={(e) => props.onChange(e, card)}></Checkbox>
                {card.Name}
            </Paper>
        </Grid>
    ));
    cardElements = tempElements;

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>{cardElements}</Grid>
        </div>
    );
}
