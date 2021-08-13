import { Button } from "@material-ui/core";
import PickCards from "./PickCards";

function PickHand(props:any) {

    return(
    <>
    <h1>Pick the cards in your hand.</h1>
    <PickCards {...props}/>
    <Button>OK</Button>
    </>
    );
}

export default PickHand;