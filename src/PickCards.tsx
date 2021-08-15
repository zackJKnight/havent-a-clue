import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ClueCard } from "./Model/ClueCard";

let cardElements;

export default function PickCards (props:any) {
    const cards = props.cards;
    cardElements = cards.map((card:ClueCard) => 
            <ListItem>
                <ListItemIcon>
                    <Checkbox></Checkbox>
                </ListItemIcon>
                <ListItemText primary={card.Name}>
                </ListItemText>
            </ListItem>
        );

    return (
        <div>
<List>{cardElements}</List>
</div>
    );
}
