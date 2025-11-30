import { ClueCard } from "./Model/ClueCard.ts";
import bartImgUrl from './Images/bart.png';
import bowlImgUrl from './Images/bowl-a-rama.png';
import donutImgUrl from './Images/donut.png';
import dungeonImgUrl from './Images/dungeon.png';
import dutchmanImgUrl from './Images/dutchman.png';
import gloveImgUrl from './Images/glove.png';
import homerImgUrl from './Images/homer.png';
import houseImgUrl from './Images/house.png';
import krustyImgUrl from './Images/krusty.png';
import kwikiImgUrl from './Images/kwiki.png';
import lisaImgUrl from './Images/lisa.png';
import manorImgUrl from './Images/manor.png';
import margeImgUrl from './Images/marge.png';
import necklaceImgUrl from './Images/necklace.png';
import nukeplantImgUrl from './Images/nuke-plant.png';
import plutoniumImgUrl from './Images/plutonium.png';
import retirementImgUrl from './Images/retirement.png';
import saxImgUrl from './Images/sax.png';
import slingshotImgUrl from './Images/slingshot.png';
import smithersImgUrl from './Images/smithers.png';
import studioImgUrl from './Images/studio.png';

type Props = {
    className?: string,
    card: ClueCard
}


export default function ClueCardView(props: Props) {
    const imgUrl = (rawName: any) => {
        if (!rawName) return undefined;
        const name = String(rawName).toLowerCase().trim();
        switch(name) {
            case 'bart' : return bartImgUrl;
            case 'bowl-a-rama' : return bowlImgUrl;
            case 'donut' : return donutImgUrl;
            case 'dungeon' : return dungeonImgUrl;
            case 'dutchman' : return dutchmanImgUrl;
            case 'glove' : return gloveImgUrl;
            case 'homer' : return homerImgUrl;
            case 'house' : return houseImgUrl;
            case 'krusty' : return krustyImgUrl;
            case 'kwiki' : return kwikiImgUrl;
            case 'lisa' : return lisaImgUrl;
            case 'manor' : return manorImgUrl;
            case 'marge' : return margeImgUrl;
            case 'necklace' : return necklaceImgUrl;
            case 'nuke-plant' : return nukeplantImgUrl;
            case 'plutonium' : return plutoniumImgUrl;
            case 'retirement' : return retirementImgUrl;
            case 'sax' : return saxImgUrl;
            case 'slingshot' : return slingshotImgUrl;
            case 'smithers' : return smithersImgUrl;
            case 'studio' : return studioImgUrl;
            case 'bowl a rama': return bowlImgUrl;
            case 'nuke plant': return nukeplantImgUrl;
        }

        // fallback: try normalized simple lookup by replacing spaces with '-' and removing punctuation
        const normalized = name.replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
        switch(normalized) {
            case 'bart': return bartImgUrl;
            case 'bowl-a-rama': return bowlImgUrl;
            case 'donut': return donutImgUrl;
            case 'dungeon': return dungeonImgUrl;
            case 'dutchman': return dutchmanImgUrl;
            case 'glove': return gloveImgUrl;
            case 'homer': return homerImgUrl;
            case 'house': return houseImgUrl;
            case 'krusty': return krustyImgUrl;
            case 'kwiki': return kwikiImgUrl;
            case 'lisa': return lisaImgUrl;
            case 'manor': return manorImgUrl;
            case 'marge': return margeImgUrl;
            case 'necklace': return necklaceImgUrl;
            case 'nuke-plant': return nukeplantImgUrl;
            case 'plutonium': return plutoniumImgUrl;
            case 'retirement': return retirementImgUrl;
            case 'sax': return saxImgUrl;
            case 'slingshot': return slingshotImgUrl;
            case 'smithers': return smithersImgUrl;
            case 'studio': return studioImgUrl;
        }
        return undefined;
    }

    const src = imgUrl(props.card.Name || props.card.Name);
    return (
        <>
            {src ? (
                <img className={props.className} src={src} alt={props.card.Name} />
            ) : (
                <div className={props.className}>{props.card.Name}</div>
            )}
        </>
    );
}


