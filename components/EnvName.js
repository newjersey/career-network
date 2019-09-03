import { makeStyles } from '@material-ui/styles';

import React from 'react';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    right: 2,
    top: 2,
    zIndex: 99999,
  },
});

export default function EnvName() {
  const classes = useStyles();

  return <Chip size="small" label={process.env.name} className={classes.root} />;
}
