import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { ClueCard } from "../Model/ClueCard.ts";
import {
  ACTIVE_VARIANT_KEY,
  VARIANTS,
  GameVariant,
  VariantCard,
  VariantCopy,
  buildCardLookup,
  defaultCardArt,
  normalizeCardName
} from "../config/gameVariants.ts";

type VariantContextValue = {
  variantKey: string;
  variant: GameVariant;
  variants: typeof VARIANTS;
  cardData: { suspects: VariantCard[]; weapons: VariantCard[]; scenes: VariantCard[] };
  copy: VariantCopy;
  cardLookup: Record<string, VariantCard>;
  setVariantKey: (key: string) => void;
  getCardMeta: (card: ClueCard | string) => VariantCard | undefined;
  getCardImage: (card: ClueCard | string) => string | undefined;
};

const VariantContext = createContext<VariantContextValue | undefined>(undefined);
const STORAGE_KEY = 'variant-key';

const loadVariantKey = (): string => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VARIANTS[stored]) return stored;
  } catch {
    /* ignore storage errors */
  }
  return ACTIVE_VARIANT_KEY;
};

const resolveVariant = (key: string): GameVariant =>
  VARIANTS[key] || VARIANTS[ACTIVE_VARIANT_KEY];

export const VariantProvider = ({ children }: { children: ReactNode }) => {
  const [variantKey, setVariantKeyState] = useState<string>(resolveVariant(loadVariantKey()).key);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, variantKey);
    } catch {
      /* ignore storage errors */
    }
  }, [variantKey]);

  const variant = useMemo(() => resolveVariant(variantKey), [variantKey]);
  const cardLookup = useMemo(() => buildCardLookup(variant), [variant]);
  const cardData = useMemo(() => ({
    suspects: variant.suspects,
    weapons: variant.weapons,
    scenes: variant.scenes
  }), [variant]);

  const getCardMeta = (card: ClueCard | string) => {
    const key = typeof card === 'string' ? card : (card.Name || card.id || '');
    const normalized = normalizeCardName(String(key));
    return cardLookup[normalized];
  };

  const getCardImage = (card: ClueCard | string): string | undefined => {
    const meta = getCardMeta(card);
    if (meta?.image) return meta.image;
    const label = typeof card === 'string' ? card : (card.Name || 'Unknown');
    return defaultCardArt(label);
  };

  const value: VariantContextValue = {
    variantKey,
    variant,
    variants: VARIANTS,
    cardData,
    copy: variant.copy,
    cardLookup,
    setVariantKey: setVariantKeyState,
    getCardMeta,
    getCardImage
  };

  return (
    <VariantContext.Provider value={value}>
      {children}
    </VariantContext.Provider>
  );
};

export const useVariantContext = () => {
  const ctx = useContext(VariantContext);
  if (!ctx) {
    throw new Error('useVariantContext must be used within VariantProvider');
  }
  return ctx;
};
