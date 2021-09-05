import { Card, Checkbox, Grid, Paper } from "@material-ui/core";
import { ClueCard } from "./Model/ClueCard";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";

let suspectElements;
let weaponElements;
let sceneElements;

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
    }
}));

export default function PickCards(props: any) {
    const classes = useStyles();

    function isDisabled(card:ClueCard): boolean{
        return !isNaN(card.HeldBy)
    }

    function onSelectionWhenMarkingShownCard(){
// do something to allow only one selection when marking the card shown to the main player.
    }

    function oneSelectionPerCategory(){
// do something to prevent selection of more than one card per category
    }

    suspectElements = props.cards?.filter((card: ClueCard) => card.Category === 'suspect')
        .map((card: ClueCard) =>
            <Grid item key={card.Name}>
                <Paper className={classes.paper} style={{ background: `${getClueCardBackgroundColor(card)}` }}>
                    <Checkbox onChange={(e) => props.onChange(e, card)} disabled={isDisabled(card)} ></Checkbox>
                    {card.Name}
                </Paper>
            </Grid>
        );
    weaponElements = props.cards?.filter((card: ClueCard) => card.Category === 'weapon')
        .map((card: ClueCard) =>

            <Grid item key={card.Name} >
                <Paper className={classes.paper} style={{ background: `${getClueCardBackgroundColor(card)}` }}>
                    <Checkbox onChange={(e) => props.onChange(e, card)} disabled={isDisabled(card)}></Checkbox>
                    {card.Name}
                </Paper>
            </Grid>
        );
    sceneElements = props.cards?.filter((card: ClueCard) => card.Category === 'scene')
        .map((card: ClueCard) =>
            <Grid item key={card.Name}>
                <Paper className={classes.paper} style={{ background: `${getClueCardBackgroundColor(card)}` }}>
                    <Checkbox onChange={(e) => props.onChange(e, card)} disabled={isDisabled(card)}></Checkbox>
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

function getClueCardBackgroundColor(card: ClueCard) {
    // TODO color heldby per player
    // TODO when NotHeldBy array contains all players, color it as a known accusation

    if (!isNaN(card.HeldBy)) {
        return 'gray';
    }

    if (card.PossShownBy?.length === 0) {
        return;
    }
    let gradientPercent = ((card.PossShownBy?.length || 0) / .1);

    return `linear-gradient(45deg, #f78da7 ${100 - gradientPercent}%, #b80000 ${gradientPercent}%)`;
}

