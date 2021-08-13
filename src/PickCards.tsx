import { Card } from "@material-ui/core";
let cardElements;
function PickCards (props:any) {
    const cards = props.cards;
    cardElements = cards.map((card:any) => 
            <Card>{card}</Card>
        );

    return (
        <div>
<ul>{cardElements}</ul>
</div>
    );
}

export default PickCards