import { applyHistoryEntry } from '../Utils/history.js';
import { Game } from '../Model/Game.js';
import { ClueCard } from '../Model/ClueCard.js';

function makeGame(): Game {
  const g = new Game();
  const c = new ClueCard('One','suspect','s1');
  c.isSuggestion = true;
  g.cards = [c];
  return g;
}

describe('PossShownBy cumulative counts', () => {
  it('accumulates counts across multiple a_card entries', () => {
    let g = makeGame();
    g = applyHistoryEntry(g, { type: 'a_card', suggestingPlayerId: 0, showingPlayerId: 2 as any });
    g = applyHistoryEntry(g, { type: 'a_card', suggestingPlayerId: 0, showingPlayerId: 2 as any });
    expect(g.cards[0].PossShownBy[2]).toBe(2);
  });
});
