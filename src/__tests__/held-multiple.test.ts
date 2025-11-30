import computeSolutionLikelihood from '../Utils/analysis.js';
import { Game } from '../Model/Game.js';
import { ClueCard } from '../Model/ClueCard.js';
import { Player } from '../Model/Player.js';

describe('multiple held cards in same category', () => {
  it('gives held cards zero and the remaining card highest', () => {
    const g = new Game();
    g.players = [new Player(0, '#111', 'A'), new Player(1, '#222', 'B')];

    const c1 = new ClueCard('One','suspect','one');
    const c2 = new ClueCard('Two','suspect','two');
    const c3 = new ClueCard('Three','suspect','three');

    c1.HeldBy = 0;
    c2.HeldBy = 0;
    // c3 unknown
    g.cards = [c1,c2,c3];

    const scores = computeSolutionLikelihood(g);
    expect(scores['One']).toBe(0);
    expect(scores['Two']).toBe(0);
    expect(scores['Three']).toBeGreaterThan(0);

    const sorted = g.cards.slice().sort((a,b) => (scores[b.Name] || 0) - (scores[a.Name] || 0));
    expect(sorted[0].Name).toBe('Three');
  });
});
