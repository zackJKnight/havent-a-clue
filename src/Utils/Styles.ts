import { Theme } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles<Theme>((theme) => ({
    app: {
        display: "flex",
        alignItems: "center",
        minWidth: '99%',
    },
    root: {
        maxWidth: '99%',
        minWidth: '90%',
        minHeight: '90vh',
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
    gridContainer: {
        justifyContent: 'center',
        width: `calc(58% + 187.4px)`
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
        minWidth: '90%',
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

