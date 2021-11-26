import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles<Theme>((theme) => ({
    app:{
        display: "flex",
        alignItems: "center"
    },
    root: {
        minWidth: '98%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        minHeight: '75%',
        margin: '1 px',
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
    section: {
        maxWidth: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
        padding: theme.spacing(.2),
    },
    cardGrid: {
        spacing: "3 px"
    },
    paper: {
        padding: theme.spacing(.5),
        color: theme.palette.text.secondary
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
        marginTop: '3%'
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

