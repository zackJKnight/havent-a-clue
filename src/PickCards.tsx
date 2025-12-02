import {  Grid, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
import BookmarkIcon from './BookmarkIcon.tsx';
import { getAccentColor } from './Utils/playerAccent.ts';
import { ClueCard } from "./Model/ClueCard.ts";
import ClueCardView from "./ClueCardView.tsx";
import { useStyles } from "./Utils/Styles.ts";
import { useState } from "react";
import { useVariantContext } from "./context/VariantContext.tsx";
import computeSolutionLikelihood from './Utils/analysis.js';
import { FlipProvider } from "./context/FlipContext.tsx";

let suspectElements;
let weaponElements;
let locationElements;

export default function PickCards(props: any) {
    const multiSelect = props.multiSelect;
    const classes = useStyles();
    const { cardData } = useVariantContext();
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
            setSuspects(newSelection);
            props.onChange([...newSelection, ...selectedWeapons, ...selectedLocations]);
        }
    }

    function onSelectWeapons(_event: React.MouseEvent<HTMLElement>,
        newSelection: string[],) {
        if (newSelection) {
            setWeapons(newSelection);
            props.onChange([...selectedSuspects, ...newSelection, ...selectedLocations]);
        }
    }

    function onSelectLocations(_event: React.MouseEvent<HTMLElement>,
        newSelection: string[],) {
        if (newSelection) {
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
            case cardData.suspects.find(s => s.displayName === newSelection)?.displayName:
                setSuspect(newSelection);
                selectedCards = [newSelection, selectedWeapon, selectedLocation];
                selectedCards = selectedCards.filter(s => s !== '');
                break;
            case cardData.weapons.find(s => s.displayName === newSelection)?.displayName:
                setWeapon(newSelection);
                selectedCards = [selectedSuspect, newSelection, selectedLocation];
                selectedCards = selectedCards.filter(s => s !== '');
                break;
            case cardData.scenes.find(s => s.displayName === newSelection)?.displayName:
                setLocation(newSelection);
                selectedCards = [selectedSuspect, selectedWeapon, newSelection];
                selectedCards = selectedCards.filter(s => s !== '');
                break;
        }
        props.onChange(selectedCards);
    }

    // compute likelihoods once per render
    const likelihoods = computeSolutionLikelihood(game);

    suspectElements = game.cards?.filter((card: ClueCard) => card.Category === 'suspect')
        .sort((a: ClueCard, b: ClueCard) => {
            const ha = Number((a as any).HeldBy);
            const hb = Number((b as any).HeldBy);
            const heldA = Number.isFinite(ha) && game.players[ha];
            const heldB = Number.isFinite(hb) && game.players[hb];
            if (heldA && !heldB) return 1;
            if (!heldA && heldB) return -1;
            return (likelihoods[b.Name] || 0) - (likelihoods[a.Name] || 0);
        })
        .map((card: ClueCard) =>
            <ToggleButton className={classes.toggleButton} key={card.Name} value={card.Name}>
                {(() => {
                    const hb = Number((card as any).HeldBy);
                    if (Number.isFinite(hb) && !isNaN(hb) && game.players[hb]) {
                        return <BookmarkIcon sx={{ position: 'absolute', left: 6, top: 6, color: game.players[hb].color, fontSize: 27, zIndex: 1200 }} accent={getAccentColor(game.players[hb].color)} />;
                    }
                    return (
                        <div className={classes.playerBadgeContainer}>
                            {game.players.map((p: any) => {
                                const count = (card.PossShownBy && card.PossShownBy[p.id]) || 0;
                                const isNotHeld = Array.isArray(card.NotHeldBy) && card.NotHeldBy.includes(p.id);
                                if (p.id === game.mainPlayerId) return null;
                                if (!isNotHeld && count <= 0) return null;
                                const accent = getAccentColor(p.color);
                                return (
                                    <Box key={p.id} className={classes.playerBadge} sx={{ background: p.color || '#777', color: accent }}>
                                        {isNotHeld ? '✕' : count}
                                    </Box>
                                )
                            })}
                        </div>
                    )
                })()}
                <ClueCardView
                    key={card.Name}
                    className={classes.cardItem}
                    imageClassName={classes.cardImage}
                    card={card}
                />
            </ToggleButton>
        );
    weaponElements = game.cards?.filter((card: ClueCard) => card.Category === 'weapon')
        .sort((a: ClueCard, b: ClueCard) => {
            const ha = Number((a as any).HeldBy);
            const hb = Number((b as any).HeldBy);
            const heldA = Number.isFinite(ha) && game.players[ha];
            const heldB = Number.isFinite(hb) && game.players[hb];
            if (heldA && !heldB) return 1;
            if (!heldA && heldB) return -1;
            return (likelihoods[b.Name] || 0) - (likelihoods[a.Name] || 0);
        })
        .map((card: ClueCard) =>
            <ToggleButton className={classes.toggleButton} key={card.Name} value={card.Name}>
                {(() => {
                    const hb = Number((card as any).HeldBy);
                    if (Number.isFinite(hb) && !isNaN(hb) && game.players[hb]) {
                        return <BookmarkIcon sx={{ position: 'absolute', left: 6, top: 6, color: game.players[hb].color, fontSize: 27, zIndex: 1200 }} accent={getAccentColor(game.players[hb].color)} />;
                    }
                    return (
                        <div className={classes.playerBadgeContainer}>
                            {game.players.map((p: any) => {
                                const count = (card.PossShownBy && card.PossShownBy[p.id]) || 0;
                                const isNotHeld = Array.isArray(card.NotHeldBy) && card.NotHeldBy.includes(p.id);
                                if (p.id === game.mainPlayerId) return null;
                                if (!isNotHeld && count <= 0) return null;
                                const accent = getAccentColor(p.color);
                                return (
                                    <Box key={p.id} className={classes.playerBadge} sx={{ background: p.color || '#777', color: accent }}>
                                        {isNotHeld ? '✕' : count}
                                    </Box>
                                )
                            })}
                        </div>
                    )
                })()}
                <ClueCardView
                    key={card.Name}
                    className={classes.cardItem}
                    imageClassName={classes.cardImage}
                    card={card}
                />
            </ToggleButton>
        );
    locationElements = game.cards?.filter((card: ClueCard) => card.Category === 'scene')
        .sort((a: ClueCard, b: ClueCard) => {
            const ha = Number((a as any).HeldBy);
            const hb = Number((b as any).HeldBy);
            const heldA = Number.isFinite(ha) && game.players[ha];
            const heldB = Number.isFinite(hb) && game.players[hb];
            if (heldA && !heldB) return 1;
            if (!heldA && heldB) return -1;
            return (likelihoods[b.Name] || 0) - (likelihoods[a.Name] || 0);
        })
        .map((card: ClueCard) =>
            <ToggleButton className={classes.toggleButton} key={card.Name} value={card.Name}>
                {(() => {
                    const hb = Number((card as any).HeldBy);
                    if (Number.isFinite(hb) && !isNaN(hb) && game.players[hb]) {
                        return <BookmarkIcon sx={{ position: 'absolute', left: 6, top: 6, color: game.players[hb].color, fontSize: 27, zIndex: 1200 }} accent={getAccentColor(game.players[hb].color)} />;
                    }
                    return (
                        <div className={classes.playerBadgeContainer}>
                            {game.players.map((p: any) => {
                                const count = (card.PossShownBy && card.PossShownBy[p.id]) || 0;
                                const isNotHeld = Array.isArray(card.NotHeldBy) && card.NotHeldBy.includes(p.id);
                                if (p.id === game.mainPlayerId) return null;
                                if (!isNotHeld && count <= 0) return null;
                                const accent = getAccentColor(p.color);
                                return (
                                    <Box key={p.id} className={classes.playerBadge} sx={{ background: p.color || '#777', color: accent }}>
                                        {isNotHeld ? '✕' : count}
                                    </Box>
                                )
                            })}
                        </div>
                    )
                })()}
                <ClueCardView
                    key={card.Name}
                    className={classes.cardItem}
                    imageClassName={classes.cardImage}
                    card={card}
                />
            </ToggleButton >
        );

    return (
        <FlipProvider>
            <div className={classes.gridWrapper}>
                {!props.multiSelect && (
                    <>
                        <div className={classes.suspiciousBottomRight}><Typography>Less suspicious</Typography></div>
                        <div className={classes.suspiciousSectionLabel}><Typography>More suspicious</Typography></div>
                    </>
                )}
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
            </div>
        </FlipProvider>
    );
}
