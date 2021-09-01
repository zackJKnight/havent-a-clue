import { Card, Checkbox, Grid, Paper } from "@material-ui/core";
import { ClueCard } from "./Model/ClueCard";
import { makeStyles } from '@material-ui/core/styles';

let suspectElements;
let weaponElements;
let sceneElements;
// color heldBy as full red and disable from selection for accusation.
// consider a red gradient from min possiblyShownBy.len to max possiblyShownBy.len
// to show cards that are likely known as a heatmap. Accuse cards that are least possibly shown

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "lg"
    },
    section: {
        maxWidth: '66%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary
    },
}));

export default function PickCards(props: any) {
    const classes = useStyles();
    const bgColorMin = ""; // cards math dot min on possiblyShown //idea is incomplete. color will change each turn
    // what if instead we fill the card with dots representing number of possiblyShown times
    const bgColorMax = Math.max(...props.cards.map((card: ClueCard) => card.PossShownBy?.length)); // cards math dot max on possiblyShown
    suspectElements = props.cards?.filter((card: ClueCard) => card.Category === 'suspect')
        .map((card: ClueCard) =>
            <Grid item key={card.Name}>
                <Paper className={classes.paper} style={{ background: `${getClueCardBackgroundColor(card, bgColorMax)}` }}>
                    <Checkbox onChange={(e) => props.onChange(e, card)}></Checkbox>
                    {card.Name}
                </Paper>
            </Grid>
        );
    weaponElements = props.cards?.filter((card: ClueCard) => card.Category === 'weapon')
        .map((card: ClueCard) =>

            <Grid item key={card.Name} >
                <Paper className={classes.paper} style={{ background: `${getClueCardBackgroundColor(card, bgColorMax)}` }}>
                    <Checkbox onChange={(e) => props.onChange(e, card)}></Checkbox>
                    {card.Name}
                </Paper>
            </Grid>
        );
    sceneElements = props.cards?.filter((card: ClueCard) => card.Category === 'scene')
        .map((card: ClueCard) =>
            <Grid item key={card.Name}>
                <Paper className={classes.paper} style={{ background: `${getClueCardBackgroundColor(card, bgColorMax)}` }}>
                    <Checkbox onChange={(e) => props.onChange(e, card)}></Checkbox>
                    {card.Name}
                </Paper>
            </Grid>
        );

    return (
        <div className={classes.root}>
            <Card className={classes.section}>
                <h3>Suspects</h3>
                <Grid container spacing={4}>{suspectElements}</Grid>
            </Card>
            <Card className={classes.section}>
                <h3>Weapons</h3>
                <Grid container spacing={4}>{weaponElements}</Grid>
            </Card>
            <Card className={classes.section}>
                <h3>Locations</h3>
                <Grid container spacing={4}>{sceneElements}</Grid>
            </Card>
        </div>
    );
}

function getClueCardBackgroundColor(card: ClueCard, max: number) {
    //TODO this is a hot mess. Is suggestion is still setting a color... so it isn't getting unset.
    if (!isNaN(card.HeldBy)) {
        return 'gray';
    }

    if (card.PossShownBy?.length === 0) {
        return;
    }
    let gradientPercent = ((card.PossShownBy?.length || 0) / .1);

    return `linear-gradient(45deg, #f78da7 ${100 - gradientPercent}%, #b80000 ${gradientPercent}%)`;
}

