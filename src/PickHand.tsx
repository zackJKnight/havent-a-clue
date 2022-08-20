import { Button, Typography } from "@mui/material";
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import { useStyles } from "./Utils/Styles";
import { Game } from "./Model/Game";
import PickCards from "./PickCards";
import { getClueCardHints } from "./hooks/use-clue-card-hints";

export default function PickHand(props: any) {
    const classes = useStyles();
    const history = useHistory();

    const [game, setGame] = useState<Game>(props.game);
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    let heldBy = parseInt(props.matchProps.match.params.playerId.replace(':', ''));

    function updateSelectedCards(
        newSelection: string[],) {
        if (newSelection) {
            // console.log(`updateSelectedCards ${newSelection}`);
            setSelectedCards(newSelection);
        }
    }

    function onOK() {
        // add the player to the NotHeldby array of all unselected cards.
        let tempCards = [...game.cards];
        tempCards.forEach(card => {

            //if card in selectedCards set card.HeldBy to heldBy
            if (selectedCards.includes(card.Name)) {
                card.HeldBy = heldBy;
            }
            if (card.HeldBy !== heldBy) {
                card.NotHeldBy.push(heldBy);
            }
        });
        tempCards = getClueCardHints(tempCards, game.players);
        setGame({ ...game, cards: [...tempCards] });
        history.push(`/turn:${0}`);
    }

    return (
        <div className={classes.root}>
            <Typography variant='h3'>Pick cards in your hand</Typography>
            <PickCards game={game} selectedCards={selectedCards} multiSelect={true} onChange={updateSelectedCards} />
            <div className={classes.bottomButtonContainer}>
                <Button color="primary" className={classes.buttonInput} variant='contained' onClick={onOK}>OK</Button>
            </div>
        </div>
    );
}
