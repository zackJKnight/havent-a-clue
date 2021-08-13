import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
let cardElements;
export default function PickCards (props:any) {
    const cards = props.cards;
    cardElements = cards.map((card:any) => 
            <ListItem>
                <ListItemIcon>
                    <Checkbox></Checkbox>
                </ListItemIcon>
                <ListItemText primary={card}>
                </ListItemText>
            </ListItem>
        );

    return (
        <div>
<List>{cardElements}</List>
</div>
    );
}
