import { Button } from "@material-ui/core";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Show(props: any) {

    const history = useHistory();
    const playerId = parseInt(props.matchProps.match.params.playerId.replace(':', ''));
    const playersAfter = props.game.players.slice(playerId);
    const playersBefore = props.game.players.slice(0, playerId);
    const playerTurnOrder = [...playersAfter, ...playersBefore];

    const [nextPlayerId, setNextPlayer] = useState({ ...playerTurnOrder[1] }.id);
    const [answeredNoLink] = useState(`/show:${playerId}`);

    function onYes() {

        // if no cards in the suggestion are known, mark them all as possibly shown by
        // and move to next turn
        
    }

    function onNo() {

        let i = playerTurnOrder.indexOf(playerTurnOrder.filter(player => player.id === nextPlayerId)[0]);
        if (i + 1 > props.game.players.length - 1) {
            history.push(`/turn:${{ ...playerTurnOrder[1] }.id}`);
        } else {
            setNextPlayer(playerTurnOrder[i + 1].id);
            history.push(answeredNoLink);
        }

    }

    return (
        <>
            <h1>{`Did Player ${nextPlayerId + 1} show a card to player ${playerId + 1} ??`}</h1>

            <Link to={`/turn:${playerId + 1}`} onClick={onYes}>
                <Button >Yes</Button>
            </Link>
                <Button onClick={onNo} >No</Button>
        </>
    )
}