import { Card, Grid, Radio, RadioGroup, Typography } from "@material-ui/core";
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
    const [game] = useState(props.game);
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

    suspectElements = game.cards?.filter((card: ClueCard) => card.Category === 'suspect')
        .map((card: ClueCard) =>
            <ClueCardView
                key={card.Name}
                onChange={onCardSelected}
                class={classes.cardItem}
                card={card}
                control={<Radio />} />
        );
    weaponElements = game.cards?.filter((card: ClueCard) => card.Category === 'weapon')
        .map((card: ClueCard) =>
            <ClueCardView
                key={card.Name}
                onChange={onCardSelected}
                class={classes.cardItem}
                card={card}
                control={<Radio />} />
        );
    locationElements = game.cards?.filter((card: ClueCard) => card.Category === 'scene')
        .map((card: ClueCard) =>
            <ClueCardView
                key={card.Name}
                onChange={onCardSelected}
                class={classes.cardItem}
                card={card}
                control={<Radio />} />
        );

    return (
        <div className={classes.root}>
            <Card className={classes.section}>
                <Typography>Suspects</Typography>
                <Grid container={true} spacing={1} className={classes.gridContainer} >
                <RadioGroup className={classes.radioGroup} row value={selectedSuspect} onChange={onCardSelected}>
                    {suspectElements}
                </RadioGroup>
                </Grid>
            </Card>
            <Card className={classes.section}>
                <Typography>Weapons</Typography>
                <Grid container={true} spacing={1} className={classes.gridContainer} >
                <RadioGroup className={classes.radioGroup} row value={selectedWeapon} onChange={onCardSelected}>
                    {weaponElements}
                </RadioGroup>
                </Grid>
            </Card>
            <Card className={classes.section}>
                <Typography>Locations</Typography>
                <Grid container={true} spacing={1} className={classes.gridContainer} >
                <RadioGroup className={classes.radioGroup} row value={selectedLocation} onChange={onCardSelected}>
                    {locationElements}
                </RadioGroup>
                </Grid>
            </Card>
        </div>
    );
}
