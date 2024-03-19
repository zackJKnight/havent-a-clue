import {  Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
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

    function onSelectSuspects(_event: React.MouseEvent<HTMLElement>,
        newSelection: string[],) {
        if (newSelection) {
            console.log(`onSelectSuspects ${newSelection}`);
            setSuspects(newSelection);
            props.onChange([...newSelection, ...selectedWeapons, ...selectedLocations]);
        }
    }

    function onSelectWeapons(_event: React.MouseEvent<HTMLElement>,
        newSelection: string[],) {
        if (newSelection) {
            console.log(`onSelectWeapons ${newSelection}`);
            setWeapons(newSelection);
            props.onChange([...selectedSuspects, ...newSelection, ...selectedLocations]);
        }
    }

    function onSelectLocations(_event: React.MouseEvent<HTMLElement>,
        newSelection: string[],) {
        if (newSelection) {
            console.log(`onSelectLocations ${newSelection}`);
            setLocations(newSelection);
            props.onChange([...selectedSuspects, ...selectedWeapons, ...newSelection]);
        }
    }

    const onCardSelected = (_event: React.MouseEvent<HTMLElement>,
        newSelection: string,) => {
        if (newSelection === undefined) {
            return;
        }
        let selectedCards;
        switch (newSelection) {
            case CardData.suspects.find(s => s.displayName === newSelection)?.displayName:
                setSuspect(newSelection);
                selectedCards = [newSelection, selectedWeapon, selectedLocation];
                selectedCards = selectedCards.filter(s => s !== '');
                break;
            case CardData.weapons.find(s => s.displayName === newSelection)?.displayName:
                setWeapon(newSelection);
                selectedCards = [selectedSuspect, newSelection, selectedLocation];
                selectedCards = selectedCards.filter(s => s !== '');
                break;
            case CardData.scenes.find(s => s.displayName === newSelection)?.displayName:
                setLocation(newSelection);
                selectedCards = [selectedSuspect, selectedWeapon, newSelection];
                selectedCards = selectedCards.filter(s => s !== '');
                break;
        }
        props.onChange(selectedCards);
    }

    suspectElements = game.cards?.filter((card: ClueCard) => card.Category === 'suspect')
        .map((card: ClueCard) =>
            <ToggleButton sx={{ '& .MUI-selected': {
                backgroundColor: 'rgba(181, 166, 53, .5)',
            }}} key={card.Name} value={card.Name} style={{ background: `${card.BackgroundColor}` }}>
                <ClueCardView
                    key={card.Name}
                    class={classes.cardItem}
                    card={card}
                />
            </ToggleButton>
        );
    weaponElements = game.cards?.filter((card: ClueCard) => card.Category === 'weapon')
        .map((card: ClueCard) =>
            <ToggleButton className={classes.toggleButton} key={card.Name} value={card.Name} style={{ background: `${card.BackgroundColor}` }}>
                <ClueCardView
                    key={card.Name}
                    class={classes.cardItem}
                    card={card}
                />
            </ToggleButton>
        );
    locationElements = game.cards?.filter((card: ClueCard) => card.Category === 'scene')
        .map((card: ClueCard) =>
            <ToggleButton className={classes.toggleButton} key={card.Name} value={card.Name} style={{ background: `${card.BackgroundColor}` }}>
                <ClueCardView
                    key={card.Name}
                    class={classes.cardItem}
                    card={card}
                />
            </ToggleButton >
        );

    return (
        <>
            <Grid container spacing={1} className={classes.gridContainer}>
                <ToggleButtonGroup  className={classes.toggleButtonGroup} size="small" value={multiSelect ? selectedSuspects : selectedSuspect} onChange={multiSelect ? onSelectSuspects : onCardSelected} exclusive={!multiSelect}>
                    {suspectElements}
                </ToggleButtonGroup>
                <ToggleButtonGroup className={classes.toggleButtonGroup} size="small" value={multiSelect ? selectedWeapons : selectedWeapon} onChange={multiSelect ? onSelectWeapons : onCardSelected} exclusive={!multiSelect}>
                    {weaponElements}
                </ToggleButtonGroup>

                <ToggleButtonGroup className={classes.toggleButtonGroup} size="small" value={multiSelect ? selectedLocations : selectedLocation} onChange={multiSelect ? onSelectLocations : onCardSelected} exclusive={!multiSelect}>
                    {locationElements}
                </ToggleButtonGroup>

            </Grid>
        </>
    );
}
