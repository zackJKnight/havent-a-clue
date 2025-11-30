import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Box, Typography, IconButton } from '@mui/material';
import { getNameInitial } from './Utils/nameInitial.ts';
import { getAccentColor } from './Utils/playerAccent.ts';
import { useStyles } from './Utils/Styles.ts';
// lightweight chevrons used instead of heavy icon dependency

type Player = {
  id: number;
  color?: string;
  name?: string;
}

type Props = {
  players: Player[];
  mainPlayerId?: number;
  onSize?: (size: 'small' | 'large') => void;
}

export default function PlayersRail(props: Props) {
  const classes = useStyles();
  const { players = [], onSize, mainPlayerId } = props;
  const [size, setSize] = useState<'small' | 'large'>('small');
  const location = useLocation();

  // derive active player from route if present (turn/show/hand/accuse/win)
  const getActiveFromPath = () => {
    const path = location.pathname || '';
    const m = path.match(/\/(turn|show|hand|accuse|win)\/(\d+)/);
    if (m && m[2]) return parseInt(m[2]);
    return undefined;
  }
  const routeActiveId = getActiveFromPath();

  useEffect(() => {
    if (onSize) onSize(size);
  }, [size, onSize]);

  function toggleSize() {
    setSize(s => s === 'small' ? 'large' : 'small');
  }

  return (
    <Box
      className={classes.playersRail}
      data-size={size}
      onClick={toggleSize}
    >
      <Box className={classes.playersRailInner}>
        <Box display="flex" flexDirection="column" gap={1} alignItems="center">
          {players.map(p => {
            const isActive = typeof routeActiveId === 'number' ? routeActiveId === p.id : (typeof mainPlayerId === 'number' && mainPlayerId === p.id);
            const avatarSize = isActive ? (size === 'small' ? 52 : 80) : (size === 'small' ? 40 : 64);
            return (
              <Box key={p.id} display="flex" flexDirection="column" alignItems="center">
                <Avatar sx={{ bgcolor: p.color || '#777', color: getAccentColor(p.color), border: `2px solid ${getAccentColor(p.color)}`, width: avatarSize, height: avatarSize, transform: isActive ? 'scale(1.05)' : 'none', boxShadow: isActive ? '0 4px 10px rgba(0,0,0,0.2)' : 'none', transition: 'transform 160ms ease, box-shadow 160ms ease' }}>{p.name ? getNameInitial(p.name) : String(p.id)}</Avatar>
                {size === 'large' && <Typography variant="caption">{p.name}</Typography>}
              </Box>
            );
          })}
        </Box>
      </Box>
      <IconButton size="small" className={classes.playersRailToggle} onClick={(e) => { e.stopPropagation(); toggleSize(); }}>
        <span className={classes.playersRailChevron}>{size === 'small' ? '‹' : '›'}</span>
      </IconButton>
    </Box>
  );
}
