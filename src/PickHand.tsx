import { Button, Card, Checkbox, Grid, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { ChangeEvent, useState } from "react";
import { ClueCard } from "./Model/ClueCard";
import { useStyles } from "./Utils/Styles";
import ClueCardView from "./ClueCardView";

let suspectElements;
let weaponElements;
let locationElements;

export default function PickHand(props: any) {
    const classes = useStyles();

    const [cards, setCards] = useState<Array<ClueCard>>(props.cards);
    let heldBy = parseInt(props.matchProps.match.params.playerId.replace(':', ''));

    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>, card: ClueCard) {

        if (card === undefined) {
            return;
        }
        if (!event.target.checked) {
            heldBy = NaN;
        }
        let updatedCards = [...cards].filter((item: ClueCard) => item.Name !== card.Name);
        card.HeldBy = heldBy;
        updatedCards.push(card);
        setCards([...updatedCards]);
    }

    function onOK() {
        // add the player to the NotHeldby array of all unselected cards.
        const tempCards = [...cards];
        tempCards.forEach(card => {
            if (card.HeldBy !== heldBy) {
                card.NotHeldBy.push(heldBy);
            }
        });
        setCards([...tempCards]);
    }
    suspectElements = props.cards?.filter((card: ClueCard) => card.Category === 'suspect')
        .map((card: ClueCard) =>
            <Grid item key={card.Name} >
                <ClueCardView 
                onChange={toggleCardSelection} 
                class={classes.paper} 
                card={card}
                control={<Checkbox/>} />
            </Grid>
        );
    weaponElements = props.cards?.filter((card: ClueCard) => card.Category === 'weapon')
        .map((card: ClueCard) =>
            <Grid item key={card.Name} >
                <ClueCardView 
                onChange={toggleCardSelection} 
                class={classes.paper} 
                card={card}
                control={<Checkbox/>} />
            </Grid>
        );
    locationElements = props.cards?.filter((card: ClueCard) => card.Category === 'scene')
        .map((card: ClueCard) =>
            <Grid item key={card.Name}>
                <ClueCardView 
                onChange={toggleCardSelection} 
                class={classes.paper} 
                card={card}
                control={<Checkbox/>} />
            </Grid>
        );

    return (
        <div className={classes.root}>
            <Typography variant='h3'>Pick cards in your hand</Typography>
            <Card className={classes.section}>
                <Typography>Suspects</Typography>
                <Grid container={true} spacing={1} >
                    {suspectElements}
                </Grid>
            </Card>
            <Card className={classes.section}>
                <Typography>Weapons</Typography>
                <Grid container={true} spacing={1}>{weaponElements}</Grid>
            </Card>
            <Card className={classes.section}>
                <Typography>Locations</Typography>
                <Grid container={true} spacing={1} >{locationElements}</Grid>
            </Card>
            <div className={classes.bottomButtonContainer}>
                <Link to={`/turn:${0}`}>
                    <Button className={classes.buttonInput} variant='contained' onClick={onOK}>OK</Button>
                </Link>
            </div>
        </div>
    );
}
