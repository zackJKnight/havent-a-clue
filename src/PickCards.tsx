import { Card, FormControl, Grid, RadioGroup, Typography } from "@material-ui/core";
import { ClueCard } from "./Model/ClueCard";
import { makeStyles, Theme } from '@material-ui/core/styles';
import ClueCardView from "./ClueCardView";
import { useStyles } from "./Utils/Styles";
import { ChangeEvent, useState } from "react";

let suspectElements;
let weaponElements;
let sceneElements;

export default function PickCards(props: any) {

    const classes = useStyles();
    const [selectedSuspect, setSuspect] = useState('');
    const [selectedWeapon, setWeapon] = useState('');
    const [selectedLocation, setLocation] = useState('');

    const onSuspectSelected = (event: ChangeEvent<HTMLInputElement>, card: ClueCard) => {
        if(event?.target?.value === undefined){
            return;
        }
        
        setSuspect(event?.target?.value);
        props.onChange(event);
    }
    suspectElements = props.cards?.filter((card: ClueCard) => card.Category === 'suspect')
        .map((card: ClueCard) =>
            <Grid item key={card.Name} >
                <ClueCardView onChange={onSuspectSelected} class={classes.paper} card={card} />
            </Grid>
        );
    weaponElements = props.cards?.filter((card: ClueCard) => card.Category === 'weapon')
        .map((card: ClueCard) =>
            <Grid item key={card.Name} >
                <ClueCardView onChange={props.onChange} class={classes.paper} card={card} />
            </Grid>
        );
    sceneElements = props.cards?.filter((card: ClueCard) => card.Category === 'scene')
        .map((card: ClueCard) =>
            <Grid item key={card.Name}>
                <ClueCardView onChange={props.onChange} class={classes.paper} card={card} />
            </Grid>
        );

    return (
        <div className={classes.page}>
            <Card className={classes.section}>
                <Typography>Suspects</Typography>
                <Grid container={true} spacing={1} >
                    <FormControl component="fieldset">
                        <RadioGroup row value={selectedSuspect} >
                            {suspectElements}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Card>
            <Card className={classes.section}>
                <Typography>Weapons</Typography>
                <Grid container={true} spacing={1}>{weaponElements}</Grid>
            </Card>
            <Card className={classes.section}>
                <Typography>Locations</Typography>
                <Grid container={true} spacing={1} >{sceneElements}</Grid>
            </Card>
        </div>
    );
}
