import applyHistoryEntry from '../Utils/history.js';
import { Game } from '../Model/Game.js';
import { ClueCard } from '../Model/ClueCard.js';
import { Player } from '../Model/Player.js';

describe('SeenBy tracking', () => {
  it('marks showing player as having seen a shown card', () => {
    const g = new Game();
    g.players = [new Player(0,'#111','A'), new Player(1,'#222','B')];
    const c = new ClueCard('One','suspect','one');
    c.isSuggestion = true;
    g.cards = [c];

    const updated = applyHistoryEntry(g, { type: 'show', suggestingPlayerId: 0, showingPlayerId: 1, cardName: 'One' });
    const card = updated.cards.find(cc => cc.Name === 'One');
    expect(card).toBeDefined();
    if (!card) return;
    expect(card.SeenBy).toContain(1);
    expect(card.HeldBy).toBe(1);
  });
});
