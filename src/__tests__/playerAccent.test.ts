import { getAccentColor } from '../Utils/playerAccent';

describe('getAccentColor', () => {
  it('returns black for white and light mustard', () => {
    expect(getAccentColor('#FFFFFF')).toBe('#000000');
    expect(getAccentColor('#ffd321')).toBe('#000000');
  });

  it('returns white for black and dark colors', () => {
    expect(getAccentColor('#000000')).toBe('#ffffff');
    expect(getAccentColor('#27632A')).toBe('#ffffff');
  });

  it('handles short hex', () => {
    expect(getAccentColor('#fff')).toBe('#000000');
  });
});
