import { Button, Card, MenuItem, Paper, TextField } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Game } from "./Model/Game";
import { Player } from "./Model/Player";
import NumberSelectList from "./Utils/NumberSelection";

export default function Home(props: { playerCount: number, maxPlayers:number, setGame: any }) {
    const history = useHistory();
    const [count, setCount] = useState(props.playerCount);
  
    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const playerCount = parseInt(e.target.value);
      let tempGame: Game = new Game();
      for (let i = 0; i < playerCount; i++) {
        tempGame.players.push(new Player(i));
      }
  
      props.setGame(() => {
        return { ...tempGame };
      });
      setCount(playerCount)
    }
  
    const numbers = NumberSelectList(props.maxPlayers);

    function onClick() {
        history.push(`/which:${count}`)
    }

    return (
      <Paper>
        <Card>
          <h1>How Many Players?
          </h1>
          <TextField
            type="number"
            select
            value={count}
            onChange={handleNumberChange}
  
            InputProps={{
              inputProps: {
                defaultValue: 2, min: 2, max: 6
              }
            }} >
            {numbers.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Card>
          <Button variant='contained' onClick={onClick} >OK</Button>
      </Paper>
    )
  }