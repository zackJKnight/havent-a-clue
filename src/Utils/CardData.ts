import { ClueCard } from "../Model/ClueCard.ts";
import { useVariantContext } from "../context/VariantContext.tsx";

export const useCardData = () => {
    const { cardData } = useVariantContext();
    return cardData;
};

export const useVariantCopy = () => {
    const { copy } = useVariantContext();
    return copy;
};

export const useVariantKey = () => {
    const { variantKey } = useVariantContext();
    return variantKey;
};

export const useVariants = () => {
    const { variants } = useVariantContext();
    return variants;
};

export const useSetVariantKey = () => {
    const { setVariantKey } = useVariantContext();
    return setVariantKey;
};

export const useCardMeta = (card: ClueCard | string) => {
    const { getCardMeta } = useVariantContext();
    return getCardMeta(card);
};

export const useCardImage = (card: ClueCard | string) => {
    const { getCardImage } = useVariantContext();
    return getCardImage(card);
};
