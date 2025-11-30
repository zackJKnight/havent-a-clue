import React from 'react';
import { useStyles } from '../Utils/Styles.ts';

type Props = {
  children?: React.ReactNode;
  className?: string;
}

export default function BottomBar({ children }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.bottomButtonContainer}>
      <div className={classes.bottomButtonBar}>
        {children}
      </div>
    </div>
  )
}
