import { Card, Grid } from "@material-ui/core";
import { ClueCard } from "./Model/ClueCard";
import { makeStyles, Theme } from '@material-ui/core/styles';
import ClueCardView from "./ClueCardView";

let suspectElements;
let weaponElements;
let sceneElements;

const useStyles = makeStyles<Theme>((theme) => ({
    container: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: "nowrap",
        height: '6em'
    },
    section: {
        maxWidth: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
        padding: theme.spacing(.2),
    },
    cardGrid: {
        spacing: "3 px"
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(.5),
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
        <Grid item key={card.Name} >
            <ClueCardView onChange={props.onChange} class={classes.paper} card={card} />
        </Grid>
        );
    weaponElements = props.cards?.filter((card: ClueCard) => card.Category === 'weapon')
        .map((card: ClueCard) =>
            <Grid item key={card.Name} >
                <ClueCardView onChange={props.onChange} class={classes.paper} card={card} />
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
            <Grid container={true} spacing={1} >{suspectElements}</Grid>
            </Card>
            <Card className={classes.section}>
            Weapons
                <Grid container={true} spacing={1}>{weaponElements}</Grid>
            </Card>
            <Card className={classes.section}>
            Locations
                <Grid container={true} spacing={1} >{sceneElements}</Grid>
            </Card>
        </div>
    );
}
