import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import Home from './Home';
import MarkShown from './MarkShown';
import { ClueCard } from './Model/ClueCard';
import { Game } from './Model/Game';
import { Player } from './Model/Player';
import PickHand from './PickHand';
import ScrollToTop from './Utils/ScrollToTop';
import Show from './Show';
import Turn from './Turn';
import { CardData } from './Utils/CardData';
import WhichPlayer from './WhichPlayer';

function App() {
  const MAX_PLAYERS = 6;
  let defaultGame = new Game();
  defaultGame.players.push(new Player(0));
  defaultGame.players.push(new Player(1));

  const [game, setGame] = useState<Game>(defaultGame);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home playerCount={2} maxPlayers={MAX_PLAYERS} setGame={setGame} />
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
          <Route path='/mark:showingPlayerId/:nextPlayerId' render={(matchProps) =>
            <MarkShown matchProps={matchProps} cards={cards} game={game}></MarkShown>
          } />
        </Switch>
      </div>
    </Router>
  );
}

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

export default App;
