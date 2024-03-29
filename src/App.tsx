import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './Home';
import { ClueCard } from './Model/ClueCard';
import { Game } from './Model/Game';
import { Player } from './Model/Player';
import PickHand from './PickHand';
import ScrollToTop from './Utils/ScrollToTop';
import Show from './Show';
import Turn from './Turn';
import { CardData } from './Utils/CardData';
import WhichPlayer from './WhichPlayer';
import { useStyles } from './Utils/Styles';
import { AppBar, Typography } from '@material-ui/core';
import Accuse from './Accuse';
import Win from './Win';

function App() {
  const MAX_PLAYERS = 6;
  let defaultGame = new Game();
  defaultGame.players.push(new Player(0));
  defaultGame.players.push(new Player(1));

  defaultGame.cards = createCards();

  const [game, setGame] = useState<Game>(defaultGame);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.app}>
        <Typography>
          Clue Boardgame Notepad
        </Typography>
      </AppBar>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            <Home playerCount={2} maxPlayers={MAX_PLAYERS} setGame={setGame} />
          </Route>
          <Route path='/which:playerCount' render={(matchProps) =>
            <WhichPlayer {...matchProps} game={game} />
          } />
          <Route path='/hand:playerId' render={(matchProps) =>
            <PickHand matchProps={matchProps} game={game} />
          } />
          <Route path='/turn:playerId' render={(matchProps) =>
            <Turn matchProps={matchProps} game={game} />
          } />
          <Route path='/show:playerId' render={(matchProps) =>
            <Show matchProps={matchProps} game={game}></Show>
          } />
          <Route path='/accuse:playerId' render={(matchProps) =>
            <Accuse matchProps={matchProps} game={game}></Accuse>
          } />
          <Route path='/win:playerId' render={(matchProps) =>
            <Win matchProps={matchProps} game={game}></Win>
          } />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
function createCards(): ClueCard[] {
  const cardData = CardData;

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
  return cards;
}

