import { Button, Card, Checkbox, Grid, Typography } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { ChangeEvent, useState } from "react";
import { ClueCard } from "./Model/ClueCard";
import { useStyles } from "./Utils/Styles";
import ClueCardView from "./ClueCardView";
import { Game } from "./Model/Game";

let suspectElements;
let weaponElements;
let locationElements;

export default function PickHand(props: any) {
    const classes = useStyles();
    const history = useHistory();

    const [game, setGame] = useState<Game>(props.game);
    let heldBy = parseInt(props.matchProps.match.params.playerId.replace(':', ''));

    function toggleCardSelection(event: ChangeEvent<HTMLInputElement>, card: ClueCard) {

        if (!game.cards.map(card => card.Name).includes(event?.target?.value)) {
            return;
        }
        if (card === undefined || !(card instanceof ClueCard)) {
            const selectedCard = game.cards.find(card => card.Name === event?.target?.value);
            if (selectedCard !== undefined) {
                card = selectedCard;
            }
        }
        if (!event.target.checked) {
            heldBy = NaN;
        }
        let updatedCards = [...game.cards].filter((item: ClueCard) => item.Name !== card.Name);
        card.HeldBy = heldBy;
        updatedCards.push(card);
        setGame({ ...game, cards: [...updatedCards] });
    }

    function onOK() {
        // add the player to the NotHeldby array of all unselected cards.
        const tempCards = [...game.cards];
        tempCards.forEach(card => {
            if (card.HeldBy !== heldBy) {
                card.NotHeldBy.push(heldBy);
            }
        });
        setGame({ ...game, cards: [...tempCards] });
        history.push(`/turn:${0}`);
    }
    suspectElements = game.cards?.filter((card: ClueCard) => card.Category === 'suspect')
        .map((card: ClueCard) =>
            <ClueCardView
                key={card.Name}
                class={classes.cardItem}
                onChange={toggleCardSelection}
                card={card}
                control={<Checkbox />} />
        );
    weaponElements = game.cards?.filter((card: ClueCard) => card.Category === 'weapon')
        .map((card: ClueCard) =>
            <ClueCardView
                key={card.Name}
                onChange={toggleCardSelection}
                class={classes.cardItem}
                card={card}
                control={<Checkbox />} />
        );
    locationElements = game.cards?.filter((card: ClueCard) => card.Category === 'scene')
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
