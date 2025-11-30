import computeSolutionLikelihood from '../Utils/analysis.js';
import { Game } from '../Model/Game.js';
import { ClueCard } from '../Model/ClueCard.js';
import { Player } from '../Model/Player.js';

describe('PickCards sorting behavior', () => {
  it('places held/shown cards lower (lower likelihood) than unknown cards', () => {
    const g = new Game();
    g.players = [new Player(0, '#111111', 'P0'), new Player(1, '#222222', 'P1')];

    const cardA = new ClueCard('A', 'suspect', 'a');
    const cardB = new ClueCard('B', 'suspect', 'b');

    // cardA is held by player 0 (shown/bookmarked)
    cardA.HeldBy = 0;

    g.cards = [cardA, cardB];

    const scores = computeSolutionLikelihood(g);
    // held card should have zero score per analysis.ts
    expect(scores['A']).toBe(0);
    // unknown card should have positive score
    expect(scores['B']).toBeGreaterThan(scores['A']);

    // when sorted descending by score, B should come before A
    const sorted = g.cards.slice().sort((a: ClueCard, b: ClueCard) => (scores[b.Name] || 0) - (scores[a.Name] || 0));
    expect(sorted[0].Name).toBe('B');
    expect(sorted[1].Name).toBe('A');
  });
});
