import { Theme } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles<Theme>((theme) => ({
    app: {
        display: "flex",
        alignItems: "center",
        width: '100%',
    },
    root: {
        width: '100%',
        maxWidth: '100%',
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette?.background?.default,
        color: theme.palette?.text?.primary,
        paddingBottom: `calc(${theme.spacing(6)} + 120px)`
    },
    content: {
        width: '100%',
        boxSizing: 'border-box',
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
    },
    palette: {
        primary: {
            light: '#fff',
            main: '#388e3c',
            dark: '#000'
        },
        secondary: {
            main: '#fbe92d',
        },
    },
    gridContainer: {
        justifyContent: 'center',
    },
    toggleButton: {
        position: 'relative',
        overflow: 'visible',
        '&.Mui-selected': {
            backgroundColor: 'rgba(181, 166, 53, .5)',
        },
        // when a ToggleButton is selected, add a slim amber/gold border to the child image
        '&.Mui-selected $cardImage': {
            border: `2px solid ${theme.palette?.warning?.main || '#ffb300'}`,
            boxSizing: 'border-box'
        }
    },
    toggleButtonGroup: {
        borderColor: 'primary',
        borderWidth: '.5px',
        borderStyle: 'solid',
        display: 'block',
        padding: `${.3}rem`,
    },
    buttonInput: {
        verticalAlign: 'bottom',
        horizontalAlign: 'center',
        minWidth: '20%',
        marginRight: '1em',
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main
        ,
        '&.Mui-disabled': {
            opacity: 0.7,
            border: `1px solid ${theme.palette?.divider || 'rgba(255,255,255,0.12)'}`
        }
    },
    bottomButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1400,
        padding: 0
    },
    bottomButtonBar: {
        display: 'flex',
        gap: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
        borderRadius: 0,
        background: '#424242',
        color: theme.palette?.getContrastText ? theme.palette.getContrastText('#424242') : '#ffffff',
        boxShadow: `0 -6px 18px rgba(0,0,0,0.12)`,
        borderTop: `1px solid ${theme.palette?.divider || 'rgba(0,0,0,0.12)'}`,
        width: '100%',
        boxSizing: 'border-box'
    },
    cardGrid: {
        padding: theme.spacing(1),
        minHeight: '100%'
    },
    cardItem: {
        display: 'flex',
        padding: theme.spacing(.5),
        marginRight: theme.spacing(.5),
        marginBottom: theme.spacing(.5),
        maxWidth: '100%',
        width: '100%',
        boxSizing: 'border-box',
        color: theme.palette.text.secondary
    },
    cardImage: {
        borderRadius: '12px',
        width: 140,
        height: 180,
        objectFit: 'cover',
        display: 'block',
        margin: '0 auto'
    },
    cardFlipContainer: {
        position: 'relative',
        width: '100%',
        maxWidth: 180,
        minHeight: 190,
        overflow: 'visible',
        perspective: 1000,
        transition: 'transform 220ms ease, box-shadow 220ms ease',
        aspectRatio: '7 / 9',
    },
    cardOverlay: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.15)',
        zIndex: 1500
    },
    cardFace: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1
    },
    cardBack: {
        width: '100%',
        minHeight: 190,
        padding: theme.spacing(1.25),
        borderRadius: 12,
        background: theme.palette?.background?.paper,
        border: `1px solid ${theme.palette?.divider || 'rgba(0,0,0,0.1)'}`,
        boxShadow: `0 4px 12px rgba(0,0,0,0.18)`,
        boxSizing: 'border-box',
        color: theme.palette?.text?.primary,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(0.75),
        zIndex: 5,
        position: 'relative'
    },
    cardHintsTitle: {
        fontSize: 12,
        fontWeight: 600,
        margin: 0
    },
    cardHintsList: {
        margin: 0,
        paddingLeft: theme.spacing(2),
        fontSize: 13,
    },
    cardHintEmpty: {
        fontSize: 13,
        color: theme.palette?.text?.secondary
    },
    cardFlipButton: {
        position: 'absolute',
        left: 4,
        bottom: 4,
        zIndex: 1200,
        background: theme.palette?.background?.paper,
        boxShadow: `0 2px 6px rgba(0,0,0,0.2)`,
        '&:hover': {
            background: theme.palette?.background?.paper,
        }
    },
    cardCorner: {
        position: 'absolute',
        width: 32,
        height: 32,
        borderRadius: 6,
        background: 'rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        border: `1px solid ${theme.palette?.divider || 'rgba(0,0,0,0.15)'}`
    },
    cardCornerImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    cardCornerText: {
        fontSize: 12,
        fontWeight: 600,
        color: theme.palette?.text?.secondary
    },
    playerBadgeContainer: {
        position: 'absolute',
        bottom: 4,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: theme.spacing(0.5),
        alignItems: 'center',
        pointerEvents: 'none'
    },
    playerBadge: {
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        padding: '0 6px',
        boxSizing: 'border-box'
        ,
        border: `2px solid #000`
    },
    bookmark: {
        position: 'absolute',
        left: 6,
        top: '10%',
        bottom: '10%',
        width: 6,
        borderRadius: 3,
        boxSizing: 'border-box'
    },
    playersRail: {
        position: 'fixed',
        right: 0,
        top: theme.spacing(8),
        height: `calc(100vh - ${theme.spacing(10)})`,
        zIndex: 1400,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
        transition: 'width 200ms ease-in-out, transform 200ms ease-in-out',
        background: 'transparent',
        pointerEvents: 'auto'
    },
    playersRailInner: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        alignItems: 'center',
        padding: theme.spacing(1),
        borderRadius: theme.shape?.borderRadius || 8,
        background: theme.palette?.background?.paper || 'rgba(0,0,0,0.0)',
        color: theme.palette?.text?.primary
    },
    playersRailToggle: {
        position: 'absolute',
        bottom: theme.spacing(1),
        right: theme.spacing(1),
        background: theme.palette?.action?.selected || 'rgba(0,0,0,0.25)'
    },
    numberSelect: {
        verticalAlign: 'bottom',
        horizontalAlign: 'center',
        minWidth: '50%'
    },
    radioGroup: {
        display: 'flex',
        justifyContent: 'center'
    }
,
    homeImage: {
        borderRadius: '20%',
        width: 'min(480px, 90vw)',
        maxHeight: '32vh',
        objectFit: 'contain',
        margin: `${theme.spacing(2)} 0`,
        display: 'block'
    },
    homeCard: {
        width: '100%',
        maxWidth: 480,
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(6),
        boxSizing: 'border-box'
    },
    gridWrapper: {
        position: 'relative'
    },
    suspiciousSectionLabel: {
        width: '100%',
        marginBottom: theme.spacing(0.5),
        paddingLeft: theme.spacing(0.5),
        fontSize: '0.9rem',
        color: theme.palette.text.secondary,
        textAlign: 'left'
    },
    suspiciousBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: theme.spacing(0.5),
        fontSize: '0.8rem',
        color: theme.palette.text.secondary
    },
    playersRailChevron: {
        fontSize: 18
    }
    ,
    avatarBorder: {
        boxSizing: 'border-box'
    }
}));
