import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Home from './Home.tsx';
import { ClueCard } from './Model/ClueCard.ts';
import { Game } from './Model/Game.ts';
import { migratePossShownBy } from './Utils/migrations.js';
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
import PlayersRail from './PlayersRail.tsx';

function App() {
  const MAX_PLAYERS = 6;
  let defaultGame = new Game();
  // initialize default players using CardData colors to keep accents consistent
  const scarlet = CardData.suspects.find(s => s.labelName?.toLowerCase().includes('scarlet'));
  const mustard = CardData.suspects.find(s => s.labelName?.toLowerCase().includes('mustard'));
  defaultGame.players.push(new Player(0, scarlet?.color || '#ff4136', scarlet?.labelName || 'Miss Scarlet'));
  defaultGame.players.push(new Player(1, mustard?.color || '#ffd321', mustard?.labelName || 'Col Mustard'));
  defaultGame.cards = createCards();
  // ensure any legacy PossShownBy arrays are migrated to maps
  migratePossShownBy(defaultGame);

  const [game, setGame] = useState<Game>(defaultGame);
  const classes = useStyles();

  function AppContent() {
    const location = useLocation();
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home playerCount={game.players.length} maxPlayers={MAX_PLAYERS} game={game} setPlayers={setGame} />} />
          <Route path="/which/:playerCount" element={<WhichPlayer game={game} />} />
          <Route path="/hand/:playerId" element={<PickHand game={game} />} />
          <Route path="/turn/:playerId" element={<Turn game={game} />} />
          <Route path="/show/:playerId" element={<Show game={game} />} />
          <Route path="/accuse/:playerId" element={<Accuse game={game} />} />
          <Route path="/win/:playerId" element={<Win />} />
        </Routes>
        {/* show players rail on all routes except home */}
        {location.pathname !== '/' && (
          <PlayersRail players={game.players} mainPlayerId={game.mainPlayerId} onSize={() => { }} />
        )}
      </>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.app}>
        <Typography>
          Clue Boardgame Notepad
        </Typography>
      </AppBar>
      <Router>
        <AppContent />
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

