import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles<Theme>((theme) => ({
    app:{
        display: "flex",
        alignItems: "center"
    },
    root: {
        margin: theme.spacing(3),
        minWidth: '98%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        minWidth: '100%',
        minHeight: '75%',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: "-moz-initial"
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
        minHeight: '10%',
        marginTop: '5%'
    },
    numberSelect: {
        verticalAlign: 'bottom',
        horizontalAlign: 'center',
        minWidth: '50%'
    },
    radioGroup: {
        display: 'flex'
    }
}));

