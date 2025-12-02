import homeClassic from '../Images/home-generic.svg';
import bartImgUrl from '../Images/bart.png';
import bowlImgUrl from '../Images/bowl-a-rama.png';
import donutImgUrl from '../Images/donut.png';
import dungeonImgUrl from '../Images/dungeon.png';
import dutchmanImgUrl from '../Images/dutchman.png';
import gloveImgUrl from '../Images/glove.png';
import homerImgUrl from '../Images/homer.png';
import houseImgUrl from '../Images/house.png';
import krustyImgUrl from '../Images/krusty.png';
import kwikiImgUrl from '../Images/kwiki.png';
import lisaImgUrl from '../Images/lisa.png';
import manorImgUrl from '../Images/manor.png';
import margeImgUrl from '../Images/marge.png';
import necklaceImgUrl from '../Images/necklace.png';
import nukeplantImgUrl from '../Images/nuke-plant.png';
import plutoniumImgUrl from '../Images/plutonium.png';
import retirementImgUrl from '../Images/retirement.png';
import saxImgUrl from '../Images/sax.png';
import slingshotImgUrl from '../Images/slingshot.png';
import smithersImgUrl from '../Images/smithers.png';
import studioImgUrl from '../Images/studio.png';
import simpsonsHome from '../Images/220px-WhoShotMrBurnsclue.png';
import { Character } from '../api/character.ts';
import { Scene } from '../api/scene.ts';
import { Weapon } from '../api/weapon.ts';

export type VariantCopy = {
  appTitle: string;
  homeHeadline: string;
  playerCountPrompt: string;
  homeImageAlt: string;
};

export type VariantCard = {
  displayName: string;
  labelName?: string;
  id: Character | Weapon | Scene;
  color?: string;
  turn?: number;
  image?: string;
  icon?: string;
};

export type GameVariant = {
  key: string;
  name: string;
  menuLabel?: string;
  homeImage: string;
  copy: VariantCopy;
  suspects: VariantCard[];
  weapons: VariantCard[];
  scenes: VariantCard[];
};

const normalizeColor = (color: string, fallback = '#0d1117') => color || fallback;

const ICONS: Record<string, string> = {
  person: `<circle cx="120" cy="96" r="44" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="10"/>
    <path d="M76 202c10-40 35-60 88-60s78 20 88 60" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`,
  rope: `<path d="M76 70c40 40 20 70 40 110s60 40 60-10-50-50-60-100 30-40 54-10" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`,
  candlestick: `<rect x="106" y="136" width="28" height="68" rx="8" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.85)" stroke-width="6"/>
    <path d="M120 120c0-16 18-16 18-34 0-10-8-18-18-18s-18 8-18 18c0 18 18 18 18 34Z" fill="rgba(255,255,255,0.8)" />
    <rect x="90" y="204" width="60" height="14" rx="6" fill="rgba(255,255,255,0.75)"/>`,
  knife: `<path d="M86 196l78-94c8-10 22 2 14 12l-40 52 12 10c6 6-2 18-10 12l-14-12-26 34c-8 10-26-2-18-14l18-32-14-12c-6-6 2-18 10-12z" fill="rgba(255,255,255,0.9)"/>`,
  revolver: `<rect x="82" y="126" width="84" height="32" rx="8" fill="rgba(255,255,255,0.8)"/>
    <rect x="142" y="158" width="30" height="14" rx="4" fill="rgba(255,255,255,0.7)"/>
    <rect x="90" y="158" width="20" height="48" rx="8" fill="rgba(255,255,255,0.85)"/>
    <path d="M82 188h44" stroke="rgba(255,255,255,0.75)" stroke-width="10" stroke-linecap="round"/>`,
  wrench: `<path d="M152 86c14-14 36-14 50 0l-24 24 12 12-42 42-12-12-24 24c-14-14-14-36 0-50l40-40z" fill="rgba(255,255,255,0.8)"/>
    <rect x="90" y="158" width="26" height="60" rx="10" fill="rgba(255,255,255,0.75)"/>`,
  pipe: `<rect x="70" y="150" width="100" height="36" rx="10" fill="rgba(255,255,255,0.82)"/>
    <rect x="150" y="94" width="24" height="120" rx="10" fill="rgba(255,255,255,0.75)"/>`,
  hall: `<rect x="66" y="90" width="108" height="128" rx="12" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.8)" stroke-width="6"/>
    <rect x="98" y="154" width="44" height="64" rx="6" fill="rgba(255,255,255,0.82)"/>`,
  ballroom: `<circle cx="120" cy="140" r="70" fill="none" stroke="rgba(255,255,255,0.82)" stroke-width="8"/>
    <path d="M60 200c24-26 96-26 120 0" stroke="rgba(255,255,255,0.7)" stroke-width="12" fill="none" stroke-linecap="round"/>`,
  conservatory: `<rect x="70" y="120" width="100" height="80" rx="8" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.8)" stroke-width="6"/>
    <path d="M70 120c22-30 78-30 100 0" stroke="rgba(255,255,255,0.82)" stroke-width="6" fill="none"/>`,
  billiard: `<rect x="70" y="120" width="100" height="70" rx="10" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.82)" stroke-width="6"/>
    <circle cx="96" cy="156" r="10" fill="rgba(255,255,255,0.85)"/>
    <circle cx="146" cy="150" r="14" fill="rgba(255,255,255,0.8)"/>`,
  library: `<rect x="72" y="110" width="96" height="116" rx="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.85)" stroke-width="6"/>
    <path d="M88 120v96M112 120v96M136 120v96" stroke="rgba(255,255,255,0.7)" stroke-width="8"/>`,
  study: `<rect x="70" y="122" width="100" height="90" rx="12" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.85)" stroke-width="6"/>
    <path d="M90 146h60v12H90zM90 166h60v12H90zM90 186h60v12H90z" fill="rgba(255,255,255,0.8)"/>`,
  lounge: `<path d="M78 188c0-28 22-50 50-50s50 22 50 50v26H78v-26z" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.82)" stroke-width="6"/>
    <path d="M86 180h84" stroke="rgba(255,255,255,0.82)" stroke-width="10" stroke-linecap="round"/>`,
  kitchen: `<rect x="70" y="120" width="100" height="100" rx="12" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.82)" stroke-width="6"/>
    <path d="M86 140h68M86 160h68M86 180h68M86 200h68" stroke="rgba(255,255,255,0.8)" stroke-width="8" stroke-linecap="round"/>`,
  dining: `<rect x="60" y="136" width="120" height="70" rx="10" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.82)" stroke-width="6"/>
    <rect x="82" y="116" width="76" height="20" rx="6" fill="rgba(255,255,255,0.85)"/>`
};

const makeCardArt = (label: string, color: string, accent?: string, glyph?: string, icon?: string) => {
  const safeLabel = label.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const initials = glyph || safeLabel.split(' ').map(w => w[0] || '').join('').slice(0, 3).toUpperCase();
  const gradientId = `g-${safeLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'card'}`;
  const base = normalizeColor(color);
  const shade = accent || '#0b172a';
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320" role="img" aria-label="${safeLabel}">
  <defs>
    <linearGradient id="${gradientId}" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${base}"/>
      <stop offset="100%" stop-color="${shade}"/>
    </linearGradient>
  </defs>
  <rect width="240" height="320" rx="24" ry="24" fill="${base}" opacity="0.9"/>
  <rect width="240" height="320" rx="24" ry="24" fill="url(#${gradientId})"/>
  <rect x="14" y="14" width="212" height="292" rx="18" ry="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>
  <circle cx="120" cy="120" r="64" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" stroke-width="6"/>
  ${icon ? `<g transform="translate(0 0)">${icon}</g>` : ''}
  <text x="120" y="140" text-anchor="middle" font-size="54" font-family="Arial, sans-serif" fill="rgba(255,255,255,0.9)" letter-spacing="4">${initials}</text>
  <text x="120" y="232" text-anchor="middle" font-size="18" font-family="Arial, sans-serif" fill="rgba(255,255,255,0.94)" letter-spacing="1">${safeLabel}</text>
</svg>`
  )}`;
};

const classicVariant: GameVariant = {
  key: 'classic',
  name: 'Classic Mystery',
  menuLabel: 'Classic Clue',
  homeImage: homeClassic,
  copy: {
    appTitle: 'Mystery Boardgame Notepad',
    homeHeadline: 'A mystery needs solving.',
    playerCountPrompt: 'How many investigators?',
    homeImageAlt: 'An abstract game board with a magnifying glass.',
  },
  suspects: [
    { displayName: 'Mss Scarlet', labelName: 'Miss Scarlet', id: Character.scarlet, color: '#c62828', turn: 1, image: makeCardArt('Miss Scarlet', '#c62828', '#5a0f0f', undefined, ICONS.person) },
    { displayName: 'Colonel Gold', labelName: 'Colonel Gold', id: Character.mustard, color: '#fbc02d', turn: 2, image: makeCardArt('Colonel Gold', '#fbc02d', '#b18600', undefined, ICONS.person) },
    { displayName: 'Dr. Ivory', labelName: 'Dr. Ivory', id: Character.white, color: '#d7ccc8', turn: 3, image: makeCardArt('Dr. Ivory', '#d7ccc8', '#8d7b75', undefined, ICONS.person) },
    { displayName: 'Detective Green', labelName: 'Detective Green', id: Character.green, color: '#2e7d32', turn: 4, image: makeCardArt('Detective Green', '#2e7d32', '#0f3d12', undefined, ICONS.person) },
    { displayName: 'Inspector Teal', labelName: 'Inspector Teal', id: Character.peacock, color: '#0288d1', turn: 5, image: makeCardArt('Inspector Teal', '#0288d1', '#014873', undefined, ICONS.person) },
    { displayName: 'Professor Violet', labelName: 'Professor Violet', id: Character.plum, color: '#7b1fa2', turn: 6, image: makeCardArt('Professor Violet', '#7b1fa2', '#3b0d4e', undefined, ICONS.person) },
  ],
  weapons: [
    { displayName: 'Silk Rope', id: Weapon.rope, image: makeCardArt('Silk Rope', '#795548', '#3e2723', undefined, ICONS.rope) },
    { displayName: 'Bronze Candlestick', id: Weapon.candlestick, image: makeCardArt('Bronze Candlestick', '#d4af37', '#9b7a00', undefined, ICONS.candlestick) },
    { displayName: 'Steel Knife', id: Weapon.knife, image: makeCardArt('Steel Knife', '#90a4ae', '#455a64', undefined, ICONS.knife) },
    { displayName: 'Ivory Revolver', id: Weapon.revolver, image: makeCardArt('Ivory Revolver', '#c0c0c0', '#6d6d6d', undefined, ICONS.revolver) },
    { displayName: 'Iron Wrench', id: Weapon.wrench, image: makeCardArt('Iron Wrench', '#9e9e9e', '#424242', undefined, ICONS.wrench) },
    { displayName: 'Lead Pipe', id: Weapon.leadPipe, image: makeCardArt('Lead Pipe', '#bdbdbd', '#616161', undefined, ICONS.pipe) },
  ],
  scenes: [
    { displayName: 'Great Hall', id: Scene.hall, image: makeCardArt('Great Hall', '#546e7a', '#29434e', undefined, ICONS.hall) },
    { displayName: 'Grand Ballroom', id: Scene.ballroom, image: makeCardArt('Grand Ballroom', '#ad1457', '#6a0d36', undefined, ICONS.ballroom) },
    { displayName: 'Glass Conservatory', id: Scene.conservatory, image: makeCardArt('Glass Conservatory', '#388e3c', '#1b5e20', undefined, ICONS.conservatory) },
    { displayName: 'Billiard Room', id: Scene.billiardRoom, image: makeCardArt('Billiard Room', '#00695c', '#003d33', undefined, ICONS.billiard) },
    { displayName: 'Library', id: Scene.library, image: makeCardArt('Library', '#5d4037', '#3e2723', undefined, ICONS.library) },
    { displayName: 'Study', id: Scene.study, image: makeCardArt('Study', '#283593', '#1a237e', undefined, ICONS.study) },
    { displayName: 'Solarium Lounge', id: Scene.lounge, image: makeCardArt('Solarium Lounge', '#8e24aa', '#4a148c', undefined, ICONS.lounge) },
    { displayName: 'Kitchen', id: Scene.kitchen, image: makeCardArt('Kitchen', '#1976d2', '#0d47a1', undefined, ICONS.kitchen) },
    { displayName: 'Dining Room', id: Scene.diningRoom, image: makeCardArt('Dining Room', '#ef6c00', '#e65100', undefined, ICONS.dining) },
  ],
};

const simpsonsVariant: GameVariant = {
  key: 'simpsons',
  name: 'Simpsons Edition',
  menuLabel: 'Simpsons Edition',
  homeImage: simpsonsHome,
  copy: {
    appTitle: 'Clue Boardgame Notepad',
    homeHeadline: 'A body has been found!',
    playerCountPrompt: 'How many Clue players?',
    homeImageAlt: 'Simpsons boardgame cover art.',
  },
  suspects: [
    { displayName: 'homer', labelName: 'Mr. Green', id: Character.green, color: '#27632A', turn: 4, image: homerImgUrl },
    { displayName: 'bart', labelName: 'Prof. Plum', id: Character.plum, color: '#8E44AD', turn: 6, image: bartImgUrl },
    { displayName: 'lisa', labelName: 'Miss Scarlett', id: Character.scarlet, color: '#FF4136', turn: 1, image: lisaImgUrl },
    { displayName: 'marge', labelName: 'Mrs. Peacock', id: Character.peacock, color: '#177fc4d2', turn: 5, image: margeImgUrl },
    { displayName: 'krusty', labelName: 'Col Mustard', id: Character.mustard, color: '#ffd321', turn: 2, image: krustyImgUrl },
    { displayName: 'smithers', labelName: 'Mrs. White', id: Character.white, color: '#FFFFFF', turn: 3, image: smithersImgUrl },
  ],
  weapons: [
    { displayName: 'glove', id: Weapon.candlestick, image: gloveImgUrl },
    { displayName: 'sax', id: Weapon.knife, image: saxImgUrl },
    { displayName: 'necklace', id: Weapon.rope, image: necklaceImgUrl },
    { displayName: 'donut', id: Weapon.leadPipe, image: donutImgUrl },
    { displayName: 'plutonium', id: Weapon.wrench, image: plutoniumImgUrl },
    { displayName: 'slingshot', id: Weapon.revolver, image: slingshotImgUrl },
  ],
  scenes: [
    { displayName: 'studio', id: Scene.lounge, image: studioImgUrl },
    { displayName: 'house', id: Scene.billiardRoom, image: houseImgUrl },
    { displayName: 'manor', id: Scene.hall, image: manorImgUrl },
    { displayName: 'kwiki', id: Scene.kitchen, image: kwikiImgUrl },
    { displayName: 'retirement', id: Scene.conservatory, image: retirementImgUrl },
    { displayName: 'dutchman', id: Scene.library, image: dutchmanImgUrl },
    { displayName: 'nuke-plant', id: Scene.ballroom, image: nukeplantImgUrl },
    { displayName: 'dungeon', id: Scene.study, image: dungeonImgUrl },
    { displayName: 'bowl-a-rama', id: Scene.diningRoom, image: bowlImgUrl },
  ],
};

export const VARIANTS: Record<string, GameVariant> = {
  [classicVariant.key]: classicVariant,
  [simpsonsVariant.key]: simpsonsVariant,
};

export const ACTIVE_VARIANT_KEY = 'classic';
export const activeVariant = VARIANTS[ACTIVE_VARIANT_KEY];

export const normalizeCardName = (name: string): string => {
  if (!name) return '';
  return String(name).toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
};

export const buildCardLookup = (variant: GameVariant): Record<string, VariantCard> => {
  const map: Record<string, VariantCard> = {};
  const add = (card: VariantCard) => {
    const keys = [card.displayName, card.labelName, String(card.id)];
    keys.forEach(k => {
      if (k) {
        map[normalizeCardName(k)] = card;
      }
    });
  };
  variant.suspects.forEach(add);
  variant.weapons.forEach(add);
  variant.scenes.forEach(add);
  return map;
};

export const defaultCardArt = (label: string) =>
  makeCardArt(label || 'Unknown', '#1f2937', '#0b1220');
