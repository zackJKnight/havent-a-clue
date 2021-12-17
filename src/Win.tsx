import { Typography } from "@material-ui/core";
import { useStyles } from "./Utils/Styles";

export default function Win(props: any) {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h3">You Win!</Typography>
        </div>
    )
}