import { Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import PickCards from "./PickCards.tsx";
import BottomBar from "./components/BottomBar.tsx";
import { useStyles } from "./Utils/Styles.ts";
import { Game } from "./Model/Game.ts";
import { getAccentColor } from './Utils/playerAccent.ts';

export default function Turn(props: any) {
    const history = useNavigate();
    const classes = useStyles();
    const [game, setGame] = useState<Game>(props.game);
    const [disabled, setDisabled] = useState<boolean>(game.cards.filter(card => card.isSuggestion).length !== 3);
    const params = useParams();
    const suggestedBy = parseInt(params.playerId || String(location.pathname.split('/').pop()));

    function toggleCardSelection(cardNames: string[]) {
if(!cardNames) {
    return;
}
        // limit choices to one per category

        let updatedCards = [...game.cards];

        updatedCards.forEach(item => item.isSuggestion = cardNames.includes(item.Name));

        setGame({ ...game, cards: [...updatedCards] });
        setDisabled(updatedCards.filter(card => card.isSuggestion).length !== 3)
    }

    function onSuggest() {

        // TODO if showing player is you, set card shown as shown to another player

        history(`/show/${suggestedBy}`);
    }

    const onSkip = () => {
        history(`/turn/${(suggestedBy + 1) % game.players.length}`);
    }

    const onAccuse = () => {
        history(`/accuse/${suggestedBy}`);
    }

    // TODO make player have a color (like clue characters) style instead of heading
    // <playerWColor> suggests:
    const suffix = game.mainPlayerId !== suggestedBy ? "'s" : '';
    const whose = game.mainPlayerId === suggestedBy ? 'Your' : game.players[suggestedBy].name;
    const activeColor = game.players?.[suggestedBy]?.color;
    const activeAccent = getAccentColor(activeColor);

    return (
        <div className={classes.root}>
            <Typography variant='h3' sx={{ backgroundColor: activeColor || 'transparent', color: activeAccent || undefined, px: 2, py: 1, borderRadius: 1 }}>{`${whose}${suffix} Suggestion`}</Typography>
            <PickCards {...props} onChange={toggleCardSelection} />
            <BottomBar>
                <Button disabled={disabled} color="primary" className={classes.buttonInput} variant='contained' onClick={onSuggest}>Suggest</Button>
                <Button disabled={disabled} color="secondary" className={classes.buttonInput} variant='contained' onClick={onAccuse}>Accuse</Button>
                <Button className={classes.buttonInput} variant='contained' onClick={onSkip}>Skip</Button>
            </BottomBar>
        </div>
    )
}