import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ClueCard } from "./Model/ClueCard";

let cardElements;


export default function PickCards(props: any) {

    cardElements = props.cards?.map((card: ClueCard, i: number) =>
        <ListItem key={i}>
            <ListItemIcon>
                <Checkbox onChange={(e) => props.onChange(e, card)}></Checkbox>
            </ListItemIcon>
            <ListItemText primary={card.Name} >
            </ListItemText>
        </ListItem>
    );

    return (
        <div>
            <List>{cardElements}</List>
        </div>
    );
}
