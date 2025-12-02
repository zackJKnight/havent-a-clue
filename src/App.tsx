import { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import Home from './Home.tsx';
import { ClueCard } from './Model/ClueCard.ts';
import { Game } from './Model/Game.ts';
import { migratePossShownBy } from './Utils/migrations.js';
import { Player } from './Model/Player.ts';
import PickHand from './PickHand.tsx';
import ScrollToTop from './Utils/ScrollToTop.tsx';
import Show from './Show.tsx';
import Turn from './Turn.tsx';
import WhichPlayer from './WhichPlayer.tsx';
import { useStyles } from './Utils/Styles.ts';
import { AppBar, Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import Accuse from './Accuse.tsx';
import Win from './Win.tsx';
import PlayersRail from './PlayersRail.tsx';
import MenuIcon from '@mui/icons-material/Menu';
import CheckIcon from '@mui/icons-material/Check';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { VariantProvider, useVariantContext } from './context/VariantContext.tsx';
import { VariantCard } from './config/gameVariants.ts';
import { useThemeMode } from './context/ThemeModeContext.tsx';

function AppWithVariant() {
  const MAX_PLAYERS = 6;
  const classes = useStyles();
  const { cardData, copy, setVariantKey, variants, variantKey } = useVariantContext();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const { mode, effectiveMode, cycleMode } = useThemeMode();
  const location = useLocation();
  const navigate = useNavigate();
  const canSwitchVariant = location.pathname === '/';

  const createCards = (data: { suspects: VariantCard[]; weapons: VariantCard[]; scenes: VariantCard[] }): ClueCard[] => {
    let cards: ClueCard[] = [];
    for (let suspect of [...data.suspects]) {
      let card: ClueCard = new ClueCard(suspect.displayName, 'suspect', suspect.id);
      cards.push(card);
    }
    for (let weapon of [...data.weapons]) {
      let card: ClueCard = new ClueCard(weapon.displayName, 'weapon', weapon.id);
      cards.push(card);
    }
    for (let scene of [...data.scenes]) {
      let card: ClueCard = new ClueCard(scene.displayName, 'scene', scene.id);
      cards.push(card);
    }
    return cards;
  };

  const buildDefaultGame = (data: { suspects: VariantCard[]; weapons: VariantCard[]; scenes: VariantCard[] }) => {
    const g = new Game();
    const sortedSuspects = [...data.suspects].sort((a, b) => (a.turn || 0) - (b.turn || 0));
    const primary = sortedSuspects[0];
    const secondary = sortedSuspects[1];
    g.players.push(new Player(0, primary?.color || '#ff4136', primary?.labelName || primary?.displayName || 'Investigator 1'));
    g.players.push(new Player(1, secondary?.color || '#ffd321', secondary?.labelName || secondary?.displayName || 'Investigator 2'));
    g.cards = createCards(data);
    migratePossShownBy(g);
    return g;
  };

  const [game, setGame] = useState<Game>(() => buildDefaultGame(cardData));

  useEffect(() => {
    setGame(buildDefaultGame(cardData));
  }, [variantKey, cardData]);

  return (
    <div className={classes.root}>
      <AppBar className={classes.app} position="sticky">
        <Toolbar sx={{ gap: 1 }}>
          <Typography sx={{ fontWeight: 600 }}>
            {copy.appTitle}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={`Theme: ${mode === 'system' ? `System (${effectiveMode})` : mode}`}>
            <IconButton edge="end" color="inherit" onClick={cycleMode} aria-label="toggle theme mode">
              {mode === 'system' ? <SettingsBrightnessIcon /> : mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={canSwitchVariant ? "Choose variant" : "Change variant on the home screen"}>
            <span>
              <IconButton
                edge="end"
                color="inherit"
                onClick={(e) => {
                  if (!canSwitchVariant) return;
                  setMenuAnchor(e.currentTarget);
                }}
                aria-label="choose variant"
                disabled={!canSwitchVariant}
              >
                <MenuIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor && canSwitchVariant)}
            onClose={() => setMenuAnchor(null)}
          >
            {Object.values(variants).map(v => (
              <MenuItem
                key={v.key}
                selected={variantKey === v.key}
                onClick={() => {
                  setVariantKey(v.key);
                  setMenuAnchor(null);
                }}>
                {variantKey === v.key && (
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckIcon fontSize="small" />
                  </ListItemIcon>
                )}
                <ListItemText primary={v.menuLabel || v.name} />
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Box className={classes.content}>
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
        {location.pathname !== '/' && (
          <PlayersRail players={game.players} mainPlayerId={game.mainPlayerId} onSize={() => { }} />
        )}
      </Box>
    </div>
  );
}

export default function App() {
  return (
    <VariantProvider>
      <Router>
        <AppWithVariant />
      </Router>
    </VariantProvider>
  );
}
