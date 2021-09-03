import { Button, Card, TextField } from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import MarkShown from './MarkShown';
import { ClueCard } from './Model/ClueCard';
import { Game } from './Model/Game';
import { Player } from './Model/Player';
import PickHand from './PickHand';
import ScrollToTop from './ScrollToTop';
import Show from './Show';
import Turn from './Turn';

function App() {
  let defaultGame = new Game();
  defaultGame.players.push(new Player(0));
  defaultGame.players.push(new Player(1));
  
  const [game, setGame] = useState<Game>(defaultGame);
  return (
    <Router>
      <ScrollToTop/>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home playerCount={2} setGame = {setGame} />
          </Route>
          <Route path='/which:playerCount' render={(matchProps) =>
            <WhichPlayer {...matchProps} game={game} />
          } />
          <Route path='/hand:playerId' render={(matchProps) =>
            <PickHand matchProps={matchProps} cards={cards} game={game} />
          } />
          <Route path='/turn:playerId' render={(matchProps) =>
            <Turn matchProps={matchProps} cards={cards} game={game} />
          } />
          <Route path='/show:playerId' render={(matchProps) =>
            <Show matchProps={matchProps} cards={cards} game={game}></Show>
          } />
          <Route path='/mark:showingPlayerId' render={(matchProps) =>
            <MarkShown matchProps={matchProps} cards={cards} game={game}></MarkShown>
          } />
        </Switch>
      </div>
    </Router>
  );
}

function Home(props: { playerCount: number, setGame: any }) {

  const [count, setCount] = useState(props.playerCount);

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const playerCount = parseInt(e.target.value);
    let tempGame: Game = new Game();
    for (let i = 0; i < playerCount; i++) {
      tempGame.players.push(new Player(i));
    }

    props.setGame(() =>{
      return {...tempGame};
    });
    setCount(playerCount)
  }

  return (
    <Card>
      <h1>How Many Players?
      </h1>
      <TextField
        type="number"
        onChange={handleNumberChange}

        InputProps={{
          inputProps: {
            defaultValue: 2, min: 2, max: 6
          }
        }} />
      <Link to={`/which:${count}`}>
        <Button >OK</Button>
      </Link>
    </Card>
  )
}

function WhichPlayer(props: any) {
  const playerCount = parseInt(props.match.params.playerCount.replace(':', ''));
  const [mainPlayerId, setPlayerId] = useState(0);
  const [game, setGame] = useState<Game>(props.game);

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPlayerId(parseInt(e.target.value) - 1)
    let tempGame = game;
    tempGame.mainPlayerId = parseInt(e.target.value) - 1;
    setGame({...game, ...tempGame});    
  }

  return (
    <Card >
      <h1>Which Player Are You?
      </h1>
      <TextField
        type="number"
        onChange={handleNumberChange}
        InputProps={{
          inputProps: {
            defaultValue: 1, min: 1, max: playerCount
          }
        }} />
      <Link to={`/hand:${mainPlayerId}`}>
        <Button>OK</Button>
      </Link>
    </Card>
  )
}

const cardData = {
  "suspects": [
    "homer",
    "bart",
    "lisa",
    "marge",
    "krusty",
    "smithers"
  ],
  "weapons": [
    "glove",
    "sax",
    "necklace",
    "donut",
    "plutonium",
    "slingshot"
  ],
  "scenes": [
    "studio",
    "arcade",
    "house",
    "manor",
    "kwiki",
    "retirement",
    "dutchman",
    "nuke-plant"
  ]
}

let cards: ClueCard[] = [];
for (let suspect of [...cardData.suspects]) {
  let card: ClueCard = new ClueCard(suspect, 'suspect');
  cards.push(card);
}
for (let weapon of [...cardData.weapons]) {
  let card: ClueCard = new ClueCard(weapon, 'weapon');
  cards.push(card);
}
for (let scene of [...cardData.scenes]) {
  let card: ClueCard = new ClueCard(scene, 'scene');
  cards.push(card);
}

export default App;
