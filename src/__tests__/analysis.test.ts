import { Game } from '../Model/Game.js';
import { ClueCard } from '../Model/ClueCard.js';
import computeSolutionLikelihood from '../Utils/analysis.js';

function baseGame(): Game {
  const g = new Game();
  g.players = [{ id: 0, color: '#fff', name: 'A'}, { id: 1, color: '#000', name: 'B'}] as any;
  const c1 = new ClueCard('One','suspect','s1');
  const c2 = new ClueCard('Two','suspect','s2');
  g.cards = [c1,c2];
  return g;
}

describe('computeSolutionLikelihood', () => {
  it('gives higher score when NotHeldBy increases', () => {
    const g = baseGame();
    const base = computeSolutionLikelihood(g);
    expect(base['One']).toBeGreaterThanOrEqual(0);

    g.cards[0].NotHeldBy.push(0,1);
    const after = computeSolutionLikelihood(g);
    expect(after['One']).toBeGreaterThan(base['One']);
  });

  it('reduces score when PossShownBy counts are present', () => {
    const g = baseGame();
    g.cards[0].NotHeldBy.push(0);
    const base = computeSolutionLikelihood(g);
    g.cards[0].PossShownBy = { 1: 3 } as any;
    const after = computeSolutionLikelihood(g);
    expect(after['One']).toBeLessThanOrEqual(base['One']);
  });
});
