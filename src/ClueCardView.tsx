import { ClueCard } from "./Model/ClueCard";

type Props = {
    class: string,
    card: ClueCard
}


export default function ClueCardView(props: Props) {
    return (
        <>
            <img style={{ borderRadius: `50%`, width: `90%`, height: `90%`}} src={require(`./Images/${props.card.Name}.png`).default} alt={props.card.Name}></img>
        </>
    );
}


