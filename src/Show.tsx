import { Typography } from "@material-ui/core";
import { useState } from "react";
import MarkShown from "./MarkShown";
import { ClueCard } from "./Model/ClueCard";
import { Game } from "./Model/Game";

export default function Show(props: any) {

    const playerId = parseInt(props.matchProps.match.params.playerId.replace(':', ''));
    const playersAfter = props.game.players.slice(playerId);
    const playersBefore = props.game.players.slice(0, playerId);
    const playerTurnOrder = [...playersAfter, ...playersBefore];

    const [nextPlayerId] = useState({ ...playerTurnOrder[1] }.id);
    const [showingPlayerId] = useState({ ...playerTurnOrder[1] }.id);

    const [cards] = useState<Array<ClueCard>>(props.cards);
    const [game] = useState<Game>(props.game);

    return (
        <>
            <Typography variant='h3'>{`Shown by player ${showingPlayerId + 1} to player ${playerId + 1}`}</Typography>
            <MarkShown game={game} cards={cards} showingPlayerId={showingPlayerId} nextPlayerId={nextPlayerId} />
        </>
    )
}
