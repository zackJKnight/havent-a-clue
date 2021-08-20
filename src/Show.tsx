import { Button } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Game } from "./Model/Game";

export function Show(props: any) {

    const [game, setGame] = useState<Game>(props.game);
    const playerId = parseInt(props.matchProps.match.params.playerId.replace(':', ''));
    const [nextPlayerId, setNextPlayer] = useState(playerId + 1);

    function onYes() {
        // if this is the highest player number, increment the round
        if (game.players.length === playerId + 1) {
            let tempGame = game;
            tempGame.round++
            setGame(tempGame);
        }

    }

    function onNo() {
        // reset checkboxes

        // move to next player if not last player
        if (nextPlayerId > game.players.length - 1) {
            setNextPlayer(0);
        } else {
            if (nextPlayerId + 1 !== playerId) {
                setNextPlayer(nextPlayerId + 1);
            } else {
                // else link to turn.... how?
            }

        }

    }

    return (
        <>
            <h1>{`Did Player ${nextPlayerId + 1} show a card to player ${playerId + 1} ??`}</h1>

            <Link to={`/turn:${playerId + 1}`} onClick={onYes}>
                <Button >Yes</Button>
            </Link>
            <Link to={`/show:${playerId}`}>
                <Button onClick={onNo} >No</Button>
            </Link>
        </>
    )
}