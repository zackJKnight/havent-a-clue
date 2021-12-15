import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles<Theme>((theme) => ({
    app:{
        display: "flex",
        alignItems: "center"
    },
    root: {
        minWidth: '98%',
        minHeight: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    page: {

    },
    container: {
        minHeight: '75%',
        margin: '1 px',
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
        marginLeft: '2%',
        marginRight: '2%',
        textAlign: 'left',
        padding: theme.spacing(1.5),
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
        position: "fixed",
    bottom: theme.spacing(2)
    },
    cardGrid: {
        padding: theme.spacing(1)
    },
    cardItem: {
        padding: theme.spacing(.5),
        marginRight: theme.spacing(.5),
        marginBottom: theme.spacing(.5),
        color: theme.palette.text.secondary
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

