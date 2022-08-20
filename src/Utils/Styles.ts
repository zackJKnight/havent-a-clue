import { Theme } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles<Theme>((theme) => ({
    app: {
        display: "flex",
        alignItems: "center"
    },
    root: {
        minWidth: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
        //backgroundColor: '#ffd321'
    },
    palette: {
        primary: {
            light   : '#fff',
            main: '#388e3c',
            dark: '#000'
        },
        secondary: {
            main: '#fbe92d',
        },
    },
    section: {
        maxWidth: '90%',
        marginLeft: '2%',
        marginRight: '2%',
        textAlign: 'left',
        padding: theme.spacing(1.5),
        justifyContent: 'center'
    },
    gridContainer: {
        justifyContent: 'center'
    },
    buttonInput: {
        verticalAlign: 'bottom',
        horizontalAlign: 'center',
        minWidth: '20%',
        marginRight: '1em',
        color: `{theme.palette.primary}`
    },
    bottomButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: '100%',
        marginTop: '3%',
        position: "sticky",
        bottom: theme.spacing(2)
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
        maxWidth: '25%',
        color: theme.palette.text.secondary
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
}));

