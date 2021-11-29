import { Card, FormControl, Grid, Radio, RadioGroup, Typography } from "@material-ui/core";
import { ClueCard } from "./Model/ClueCard";
import ClueCardView from "./ClueCardView";
import { useStyles } from "./Utils/Styles";
import { ChangeEvent, useState } from "react";
import { CardData } from "./Utils/CardData";

let suspectElements;
let weaponElements;
let locationElements;

export default function PickCards(props: any) {

    const classes = useStyles();
    const [selectedSuspect, setSuspect] = useState('');
    const [selectedWeapon, setWeapon] = useState('');
    const [selectedLocation, setLocation] = useState('');

    const onCardSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.value === undefined) {
            return;
        }

        switch (event?.target?.value) {
            case CardData.suspects.find(s => s === event?.target?.value):
                setSuspect(event?.target?.value);
                break;
            case CardData.weapons.find(s => s === event?.target?.value):
                setWeapon(event?.target?.value);
                break;
            case CardData.scenes.find(s => s === event?.target?.value):
                setLocation(event?.target?.value);
                break;
        }
        props.onChange(event);
    }

    suspectElements = props.cards?.filter((card: ClueCard) => card.Category === 'suspect')
        .map((card: ClueCard) =>
            <Grid item key={card.Name} >
                <ClueCardView 
                onChange={onCardSelected} 
                class={classes.paper} 
                card={card}
                control={<Radio/>} />
            </Grid>
        );
    weaponElements = props.cards?.filter((card: ClueCard) => card.Category === 'weapon')
        .map((card: ClueCard) =>
            <Grid item key={card.Name} >
                <ClueCardView 
                onChange={onCardSelected} 
                class={classes.paper} 
                card={card}
                control={<Radio/>} />
            </Grid>
        );
    locationElements = props.cards?.filter((card: ClueCard) => card.Category === 'scene')
        .map((card: ClueCard) =>
            <Grid item key={card.Name}>
                <ClueCardView 
                onChange={onCardSelected} 
                class={classes.paper} 
                card={card}
                control={<Radio/>} />
            </Grid>
        );

    return (
        <div className={classes.page}>
            <Card className={classes.section}>
                <Typography>Suspects</Typography>
                <Grid container={true} spacing={1} >
                    <FormControl component="fieldset">
                        <RadioGroup row value={selectedSuspect} onChange={onCardSelected}>
                            {suspectElements}   
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Card>
            <Card className={classes.section}>
                <Typography>Weapons</Typography>
                <Grid container={true} spacing={1} >
                    <FormControl component="fieldset">
                        <RadioGroup row value={selectedWeapon} onChange={onCardSelected}>
                            {weaponElements}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Card>
            <Card className={classes.section}>
                <Typography>Locations</Typography>
                <Grid container={true} spacing={1} >
                    <FormControl component="fieldset">
                        <RadioGroup row value={selectedLocation} onChange={onCardSelected}>
                            {locationElements}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Card>
        </div>
    );
}
