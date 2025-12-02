import { ClueCard } from "../Model/ClueCard.js";
import { Game } from "../Model/Game.js";
import { Player } from "../Model/Player.js";

type HintOptions = {
  includeYouLabel?: boolean;
};

const nameFor = (players: Player[], id: number | undefined | null, youId: number | undefined, includeYouLabel = true) => {
  if (typeof id !== 'number' || !players[id]) return 'Unknown';
  if (includeYouLabel && youId === id) return 'you';
  return players[id].name || `Player ${id + 1}`;
};

const formatList = (items: string[]): string => {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} or ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, or ${items.slice(-1)}`;
};

const pluralize = (word: string, count: number) => (count === 1 ? word : `${word}s`);

export const deriveHints = (card: ClueCard, game: Game, opts: HintOptions = {}): string[] => {
  const hints: string[] = [];
  const players = game.players || [];
  const youId = game.mainPlayerId;
  const includeYou = opts.includeYouLabel !== false;

  // SeenBy
  if (Array.isArray(card.SeenBy) && card.SeenBy.length > 0) {
    const names = card.SeenBy.map(id => nameFor(players, id, youId, includeYou));
    const set = Array.from(new Set(names));
    hints.push(`Seen by ${set.length} ${pluralize('player', set.length)}${set.length ? ` (${formatList(set)})` : ''}`);
  }

  // Suggested count
  if (Array.isArray(card.SuggestedBy) && card.SuggestedBy.length > 0) {
    const times = card.SuggestedBy.length;
    hints.push(`Suggested ${times} ${pluralize('time', times)}`);
    const perPlayer = Array.from(new Set(card.SuggestedBy as any[])).map(id => nameFor(players, id as any, youId, includeYou));
    if (perPlayer.length > 0) {
      hints.push(`Suggested by ${formatList(perPlayer)}`);
    }
  }

  // Not held by list
  if (Array.isArray(card.NotHeldBy) && card.NotHeldBy.length > 0) {
    const filtered = card.NotHeldBy.filter(id => id !== youId);
    const names = filtered.map(id => nameFor(players, id, youId, includeYou));
    const unique = Array.from(new Set(names));
    if (unique.length > 0) {
      const label = formatList(unique);
      hints.push(`Not held by ${label}`);
    }
  }

  // Shown info
  if (!isNaN(card.HeldBy) && players[card.HeldBy]) {
    hints.push(`Held by ${nameFor(players, card.HeldBy, youId, includeYou)}`);
  }

  // PossShownBy counts
  if (card.PossShownBy && Object.keys(card.PossShownBy).length > 0) {
    const totalPoss = Object.values(card.PossShownBy).reduce((acc, n) => acc + (n || 0), 0);
    if (totalPoss > 0) {
      hints.push(`Poss. shown ${totalPoss} ${pluralize('time', totalPoss)}`);
      const pairs = Object.keys(card.PossShownBy).map(k => {
        const id = Number(k);
        const n = card.PossShownBy?.[id] || 0;
        return `${nameFor(players, id, youId, includeYou)} (${n})`;
      });
      if (pairs.length > 0) {
        hints.push(`Poss. shown by ${pairs.join(', ')}`);
      }
    }
  }

  return hints;
};

export const attachHintsToCards = (game: Game): Game => {
  const g = { ...game } as Game;
  g.cards = g.cards.map(c => {
    const card = { ...c } as ClueCard;
    card.hints = deriveHints(card, g);
    return card;
  });
  return g;
};
