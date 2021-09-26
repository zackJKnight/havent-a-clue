import { Card, Checkbox, Grid, Paper } from "@material-ui/core";
import { ClueCard } from "./Model/ClueCard";
import { makeStyles } from '@material-ui/core/styles';
import ClueCardView from "./ClueCardView";

let suspectElements;
let weaponElements;
let sceneElements;

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "md"
    },
    section: {
        maxWidth: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left'
    },
    cardGrid: {
        spacing: .5
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(0.3),
        color: theme.palette.text.secondary
    }
}));

export default function PickCards(props: any) {
    const classes = useStyles();

    function oneSelectionPerCategory() {
        // do something to prevent selection of more than one card per category
    }

    suspectElements = props.cards?.filter((card: ClueCard) => card.Category === 'suspect')
        .map((card: ClueCard) =>
            <Grid item key={card.Name}>
                <Paper className={classes.paper} style={{ background: `${''}` }}>
                    <Checkbox onChange={(e) => props.onChange(e, card)} ></Checkbox>
                    {card.Name}
                </Paper>
            </Grid>
        );
    weaponElements = props.cards?.filter((card: ClueCard) => card.Category === 'weapon')
        .map((card: ClueCard) =>

            <Grid item key={card.Name} >
                <Paper className={classes.paper} style={{ background: `${getClueCardBackgroundColor(card)}` }}>
                    <Checkbox onChange={(e) => props.onChange(e, card)}></Checkbox>
                    {card.Name}
                </Paper>
            </Grid>
        );
    sceneElements = props.cards?.filter((card: ClueCard) => card.Category === 'scene')
        .map((card: ClueCard) =>
            <Grid item key={card.Name}>
                <ClueCardView onChange={props.onChange} class={classes.paper} card={card} />
            </Grid>
        );

    return (
        <div className={classes.root}>
            <Card className={classes.section}>
            Suspects
            <Grid className={classes.cardGrid} container >{suspectElements}</Grid>
            </Card>
            <Card className={classes.section}>
            Weapons
                <Grid className={classes.cardGrid} container >{weaponElements}</Grid>
            </Card>
            <Card className={classes.section}>
            Locations
                <Grid className={classes.cardGrid} container >{sceneElements}</Grid>
            </Card>
        </div>
    );
}

const getClueCardBackgroundColor = (card: ClueCard) => {
    // TODO color heldby per player
    // TODO when NotHeldBy array contains all players, color it as a known accusation
    if (card === undefined) {
        return;
    }

    if (!isNaN(card.HeldBy)) {
        card.BackgroundColor = 'gray';
    }

    if (card.PossShownBy?.length === 0) {
        return;
    }
    let gradientPercent = ((card.PossShownBy?.length || 0) / .1);

    card.BackgroundColor = `linear-gradient(45deg, #f78da7 ${100 - gradientPercent}%, #b80000 ${gradientPercent}%)`;
}

