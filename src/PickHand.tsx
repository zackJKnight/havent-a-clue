import { Button, Card, Checkbox, Grid, Typography } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { ChangeEvent, useState } from "react";
import { ClueCard } from "./Model/ClueCard";
import { useStyles } from "./Utils/Styles";
import ClueCardView from "./ClueCardView";

let suspectElements;
let weaponElements;
let locationElements;

export default function PickHand(props: any) {
    const classes = useStyles();
    const history = useHistory();

    const [cards, setCards] = useState<Array<ClueCard>>(props.cards);
    let heldBy = parseInt(props.matchProps.match.params.playerId.replace(':', ''));

    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>, card: ClueCard) {

        if (!cards.map(card => card.Name).includes(event?.target?.value)) {
            return;
        }
        if (card === undefined || !(card instanceof ClueCard)) {
            const selectedCard = cards.find(card => card.Name === event?.target?.value);
            if (selectedCard !== undefined) {
                card = selectedCard;
            }
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
        history.push(`/turn:${0}`);
    }
    suspectElements = props.cards?.filter((card: ClueCard) => card.Category === 'suspect')
        .map((card: ClueCard) =>
            <ClueCardView
                key={card.Name}
                class={classes.cardItem}
                onChange={toggleCardSelection}
                card={card}
                control={<Checkbox />} />
        );
    weaponElements = props.cards?.filter((card: ClueCard) => card.Category === 'weapon')
        .map((card: ClueCard) =>
            <ClueCardView
                key={card.Name}
                onChange={toggleCardSelection}
                class={classes.cardItem}
                card={card}
                control={<Checkbox />} />
        );
    locationElements = props.cards?.filter((card: ClueCard) => card.Category === 'scene')
        .map((card: ClueCard) =>
            <ClueCardView
                key={card.Name}
                onChange={toggleCardSelection}
                class={classes.cardItem}
                card={card}
                control={<Checkbox />} />
        );

    return (
        <div className={classes.root}>
            <Typography variant='h3'>Pick cards in your hand</Typography>
            <Card className={classes.section}>
                <Typography>Suspects</Typography>
                <Grid container={true} spacing={1} className={classes.gridContainer} >
                    {suspectElements}
                </Grid>
            </Card>
            <Card className={classes.section}>
                <Typography>Weapons</Typography>
                <Grid container={true} spacing={1} className={classes.gridContainer}>{weaponElements}</Grid>
            </Card>
            <Card className={classes.section}>
                <Typography>Locations</Typography>
                <Grid container={true} spacing={1} className={classes.gridContainer}>{locationElements}</Grid>
            </Card>
            <div className={classes.bottomButtonContainer}>
                <Button color="primary" className={classes.buttonInput} variant='contained' onClick={onOK}>OK</Button>
            </div>
        </div>
    );
}
