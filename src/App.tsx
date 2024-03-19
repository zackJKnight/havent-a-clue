import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './Home.tsx';
import { ClueCard } from './Model/ClueCard.ts';
import { Game } from './Model/Game.ts';
import { Player } from './Model/Player.ts';
import PickHand from './PickHand.tsx';
import ScrollToTop from './Utils/ScrollToTop.tsx';
import Show from './Show.tsx';
import Turn from './Turn.tsx';
import { CardData } from './Utils/CardData.ts';
import WhichPlayer from './WhichPlayer.tsx';
import { useStyles } from './Utils/Styles.ts';
import { AppBar, Typography } from '@mui/material';
import Accuse from './Accuse.tsx';
import Win from './Win.tsx';

function App() {
  const MAX_PLAYERS = 6;
  let defaultGame = new Game();
  defaultGame.players.push(new Player(0, 'red', 'Miss Scarlet'));
  defaultGame.players.push(new Player(1, 'mustard', 'Col Mustard'));
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
            <Home playerCount={2} maxPlayers={MAX_PLAYERS} game={game} setPlayers={setGame} />
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
    let card: ClueCard = new ClueCard(suspect.displayName, 'suspect', suspect.id);
    cards.push(card);
  }
  for (let weapon of [...cardData.weapons]) {
    let card: ClueCard = new ClueCard(weapon.displayName, 'weapon', weapon.id);
    cards.push(card);
  }
  for (let scene of [...cardData.scenes]) {
    let card: ClueCard = new ClueCard(scene.displayName, 'scene', scene.id);
    cards.push(card);
  }
  return cards;
}

