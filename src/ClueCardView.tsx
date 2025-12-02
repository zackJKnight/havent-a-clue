import { ClueCard } from "./Model/ClueCard.ts";
import { useVariantContext } from "./context/VariantContext.tsx";

type Props = {
    className?: string,
    card: ClueCard
}


export default function ClueCardView(props: Props) {
    const { getCardMeta, getCardImage } = useVariantContext();
    const lookup = getCardMeta(props.card);
    const src = getCardImage(props.card);
    const alt = lookup?.labelName || props.card.Name;
    return (
        <>
            {src ? (
                <img className={props.className} src={src} alt={alt} />
            ) : (
                <div className={props.className}>{props.card.Name}</div>
            )}
        </>
    );
}
