import { applyHistoryEntry } from '../Utils/history.js';
import { Game } from '../Model/Game.js';
import { ClueCard } from '../Model/ClueCard.js';

function makeGame() : Game {
  const g = new Game();
  const c = new ClueCard('One','suspect','s1');
  c.isSuggestion = true;
  g.cards = [c];
  return g;
}

describe('NotHeldBy dedupe', () => {
  it('does not add duplicate NotHeldBy entries', () => {
    let g = makeGame();
    g = applyHistoryEntry(g, { type: 'none', suggestingPlayerId: 1 });
    g = applyHistoryEntry(g, { type: 'none', suggestingPlayerId: 1 });
    expect(g.cards[0].NotHeldBy.filter(n => n === 1).length).toBe(1);
  });
});
