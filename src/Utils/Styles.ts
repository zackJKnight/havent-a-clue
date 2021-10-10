import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles<Theme>((theme) => ({
    container: {
        minHeight: '100%',
        flexGrow: "-moz-initial"
    },
    inputContainer: {
        marginTop: 25,
        minHeight: 150
    },
    buttonInput: {
        verticalAlign: 'bottom',
        minWidth: '33%'
    },
    numberSelect: {
        verticalAlign: 'bottom',
        minWidth: '50%'
    }
}));