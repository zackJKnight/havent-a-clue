import { useEffect, useRef, useState } from "react";
import { IconButton, Typography } from "@mui/material";
import FlipIcon from '@mui/icons-material/FlipCameraAndroid';
import { ClueCard } from "./Model/ClueCard.ts";
import { useVariantContext } from "./context/VariantContext.tsx";
import { useStyles } from "./Utils/Styles.ts";
import useCardHints from "./hooks/use-card-hints.ts";
import { useFlipContext } from "./context/FlipContext.tsx";

type Props = {
    className?: string,
    imageClassName?: string,
    card: ClueCard
}


export default function ClueCardView(props: Props) {
    const classes = useStyles();
    const { getCardMeta, getCardImage } = useVariantContext();
    const [showBack, setShowBack] = useState(false);
    const [showHintIcon, setShowHintIcon] = useState(true);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const hints = useCardHints(props.card);
    const lookup = getCardMeta(props.card);
    const src = getCardImage(props.card);
    const alt = lookup?.labelName || props.card.Name;
    const { flippedId, setFlippedId } = useFlipContext();
    const isFlipped = showBack;
    const scheduleHide = () => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
        }
        hideTimer.current = setTimeout(() => setShowHintIcon(false), 2000);
    };

    useEffect(() => {
        setShowHintIcon(true);
        scheduleHide();
        return () => {
            if (hideTimer.current) clearTimeout(hideTimer.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Close if another card flips
    useEffect(() => {
        if (flippedId && flippedId !== props.card.id && showBack) {
            setShowBack(false);
        }
    }, [flippedId, props.card.id, showBack]);

    // Close on outside click
    useEffect(() => {
        const onClickOutside = (e: MouseEvent | TouchEvent) => {
            if (!showBack) return;
            const target = e.target as Node;
            if (containerRef.current && !containerRef.current.contains(target)) {
                setShowBack(false);
                setFlippedId(null);
            }
        };
        document.addEventListener('mousedown', onClickOutside, true);
        document.addEventListener('touchstart', onClickOutside, true);
        return () => {
            document.removeEventListener('mousedown', onClickOutside, true);
            document.removeEventListener('touchstart', onClickOutside, true);
        };
    }, [showBack, setFlippedId]);

    const revealIcon = () => {
        setShowHintIcon(true);
        scheduleHide();
    };

    const toggleFlip = (e: React.MouseEvent) => {
        e.stopPropagation();
        const next = !showBack;
        setShowBack(next);
        revealIcon();
        setFlippedId(next ? props.card.id : null);
    };

    const front = (
        <div className={classes.cardFace}>
            {src ? (
                <img className={props.imageClassName || props.className} src={src} alt={alt} />
            ) : (
                <div className={props.imageClassName || props.className}>{props.card.Name}</div>
            )}
        </div>
    );

    const back = (
        <div className={classes.cardBack}>
            {src ? (
                <>
                    <div className={classes.cardCorner} style={{ top: 6, left: 6 }}>
                        <img className={classes.cardCornerImg} src={src} alt={alt} />
                    </div>
                    <div className={classes.cardCorner} style={{ bottom: 6, right: 6 }}>
                        <img className={classes.cardCornerImg} src={src} alt={alt} />
                    </div>
                </>
            ) : (
                <>
                    <div className={classes.cardCorner} style={{ top: 6, left: 6 }}>
                        <span className={classes.cardCornerText}>{props.card.Name}</span>
                    </div>
                    <div className={classes.cardCorner} style={{ bottom: 6, right: 6 }}>
                        <span className={classes.cardCornerText}>{props.card.Name}</span>
                    </div>
                </>
            )}
            <Typography component="p" className={classes.cardHintsTitle}>Hints</Typography>
            {hints.length > 0 ? (
                <ul className={classes.cardHintsList}>
                    {hints.map((hint, idx) => (
                        <li key={`${props.card.id}-hint-${idx}`}>{hint}</li>
                    ))}
                </ul>
            ) : (
                <Typography component="p" className={classes.cardHintEmpty}>No hints yet.</Typography>
            )}
        </div>
    );

    return (
        <>
            {isFlipped && <div className={classes.cardOverlay} />}
            <div
                ref={containerRef}
                className={`${classes.cardFlipContainer} ${props.className || ''}`}
                style={{
                    transform: isFlipped ? 'translate(-50%, -50%) scale(2.1)' : 'scale(1)',
                    zIndex: isFlipped ? 2000 : 'auto',
                    position: isFlipped ? 'fixed' : 'relative',
                    top: isFlipped ? '50%' : undefined,
                    left: isFlipped ? '50%' : undefined,
                    boxShadow: isFlipped ? '0 16px 40px rgba(0,0,0,0.35)' : undefined,
                }}
                onMouseEnter={revealIcon}
                onTouchStart={revealIcon}
            >
                {showBack ? back : front}
                <IconButton
                    size="small"
                    className={classes.cardFlipButton}
                    onClick={toggleFlip}
                    aria-label={showBack ? "Show card front" : "Show card back"}
                    sx={{ opacity: showBack ? 1 : (showHintIcon ? 1 : 0), transition: 'opacity 180ms ease' }}
                >
                    <FlipIcon fontSize="inherit" />
                </IconButton>
            </div>
        </>
    );
}
