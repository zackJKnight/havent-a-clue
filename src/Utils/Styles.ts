import { Theme } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles<Theme>((theme) => ({
    app: {
        display: "flex",
        alignItems: "center",
        minWidth: '99%',
    },
    root: {
        width: '100%',
        maxWidth: '100%',
        minWidth: '100%',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette?.background?.default,
        color: theme.palette?.text?.primary,
        paddingBottom: `calc(${theme.spacing(2)} + 72px)`
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
        borderRadius: '50%',
        width: '90%',
        height: '90%',
        objectFit: 'cover'
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
        border: `2px solid currentColor`
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
        borderRadius: '20%'
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

