import { Card, Grid, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ClueCard } from "./Model/ClueCard";
import ClueCardView from "./ClueCardView";
import { useStyles } from "./Utils/Styles";
import { useState } from "react";
import { CardData } from "./Utils/CardData";

let suspectElements;
let weaponElements;
let locationElements;

export default function PickCards(props: any) {
    const multiSelect = props.multiSelect;
    const classes = useStyles();
    const [selectedSuspect, setSuspect] = useState('');
    const [selectedWeapon, setWeapon] = useState('');
    const [selectedLocation, setLocation] = useState('');
    const [selectedSuspects, setSuspects] = useState(Array<string>);
    const [selectedWeapons, setWeapons] = useState(Array<string>);
    const [selectedLocations, setLocations] = useState(Array<string>);
    const [game] = useState(props.game);

    function onSelectSuspects(event: React.MouseEvent<HTMLElement>,
        newSelection: string[],) {
        if (newSelection) {
            console.log(`onSelectSuspects ${newSelection}`);
            setSuspects(newSelection);
            props.onChange([...newSelection, ...selectedWeapons, ...selectedLocations]);
        }
    }

    function onSelectWeapons(event: React.MouseEvent<HTMLElement>,
        newSelection: string[],) {
        if (newSelection) {
            console.log(`onSelectWeapons ${newSelection}`);
            setWeapons(newSelection);
            props.onChange([...selectedSuspects, ...newSelection, ...selectedLocations]);
        }
    }

    function onSelectLocations(event: React.MouseEvent<HTMLElement>,
        newSelection: string[],) {
        if (newSelection) {
            console.log(`onSelectLocations ${newSelection}`);
            setLocations(newSelection);
            props.onChange([...selectedSuspects, ...selectedWeapons, ...newSelection]);
        }
    }

    const onCardSelected = (event: React.MouseEvent<HTMLElement>,
        newSelection: string,) => {
        console.log(newSelection);
        if (newSelection === undefined) {
            return;
        }

        switch (newSelection) {
            case CardData.suspects.find(s => s.displayName === newSelection)?.displayName:
                setSuspect(newSelection);
                break;
            case CardData.weapons.find(s => s.displayName === newSelection)?.displayName:
                setWeapon(newSelection);
                break;
            case CardData.scenes.find(s => s.displayName === newSelection)?.displayName:
                setLocation(newSelection);
                break;
        }
    }

    suspectElements = game.cards?.filter((card: ClueCard) => card.Category === 'suspect')
        .map((card: ClueCard) =>
            <ToggleButton key={card.Name} value={card.Name} style={{ background: `${card.BackgroundColor}` }}>
                <ClueCardView
                    key={card.Name}
                    class={classes.cardItem}
                    card={card}
                />
            </ToggleButton>
        );
    weaponElements = game.cards?.filter((card: ClueCard) => card.Category === 'weapon')
        .map((card: ClueCard) =>
            <ToggleButton key={card.Name} value={card.Name} style={{ background: `${card.BackgroundColor}` }}>
                <ClueCardView
                    key={card.Name}
                    class={classes.cardItem}
                    card={card}
                />
            </ToggleButton>
        );
    locationElements = game.cards?.filter((card: ClueCard) => card.Category === 'scene')
        .map((card: ClueCard) =>
            <ToggleButton key={card.Name} value={card.Name} style={{ background: `${card.BackgroundColor}` }}>
                <ClueCardView
                    key={card.Name}
                    class={classes.cardItem}
                    card={card}
                />
            </ToggleButton >
        );

    return (
        <div className={classes.root}>
            <Card className={classes.section}>
                <Typography>Suspects</Typography>
                <Grid container={true} spacing={1} className={classes.gridContainer} >
                    <ToggleButtonGroup value={multiSelect ? selectedSuspects : selectedSuspect} onChange={multiSelect ? onSelectSuspects : onCardSelected} exclusive={!multiSelect}>
                        {suspectElements}
                    </ToggleButtonGroup>
                </Grid>
            </Card>
            <Card className={classes.section}>
                <Typography>Weapons</Typography>
                <Grid container={true} spacing={1} className={classes.gridContainer} >
                    <ToggleButtonGroup value={multiSelect ? selectedWeapons : selectedWeapon} onChange={multiSelect ? onSelectWeapons : onCardSelected} exclusive={!multiSelect}>
                        {weaponElements}
                    </ToggleButtonGroup>
                </Grid>
            </Card>
            <Card className={classes.section}>
                <Typography>Locations</Typography>
                <Grid container={true} spacing={1} className={classes.gridContainer} >
                    <ToggleButtonGroup value={multiSelect ? selectedLocations : selectedLocation} onChange={multiSelect ? onSelectLocations : onCardSelected} exclusive={!multiSelect}>
                        {locationElements}
                    </ToggleButtonGroup>
                </Grid>
            </Card>
        </div>
    );
}
