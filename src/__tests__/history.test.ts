import { applyHistoryEntry } from '../Utils/history.js';
import { Game } from '../Model/Game.js';
import { ClueCard } from '../Model/ClueCard.js';

function makeTestGame(): Game {
  const g = new Game();
  g.players = [{ id: 0, color: '#fff', name: 'A' }, { id: 1, color: '#000', name: 'B' }] as any;
  const c1 = new ClueCard('One', 'suspect', 's1');
  const c2 = new ClueCard('Two', 'suspect', 's2');
  c1.isSuggestion = true;
  c2.isSuggestion = true;
  g.cards = [c1, c2];
  return g;
}

describe('applyHistoryEntry', () => {
  it('marks NotHeldBy for none show', () => {
    const game = makeTestGame();
    const updated = applyHistoryEntry(game, { type: 'none', suggestingPlayerId: 1 });
    expect(updated.cards[0].NotHeldBy).toContain(1);
    expect(updated.cards[1].NotHeldBy).toContain(1);
  });

  it('sets HeldBy when a specific card was shown', () => {
    const game = makeTestGame();
    const updated = applyHistoryEntry(game, { type: 'show', suggestingPlayerId: 0, showingPlayerId: 1, cardName: 'One' });
    const shown = updated.cards.find(c => c.Name === 'One')!;
    expect(shown.HeldBy).toBe(1);
  });

  it('increments PossShownBy counts for a_card entries', () => {
    const game = makeTestGame();
    const updated = applyHistoryEntry(game, { type: 'a_card', suggestingPlayerId: 0, showingPlayerId: 1 });
    const card = updated.cards[0];
    expect(card.PossShownBy[1]).toBeGreaterThanOrEqual(1);
  });
});
