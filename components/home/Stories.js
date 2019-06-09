import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import Picture from '../Picture';
import StoryStepper from './StoryStepper';

const styles = theme => ({
  leftContainer: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(1.5)
    },
  },
  rightContainer: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1.5)
    },
  },
  picture: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(3),
  }
});

function Stories(props) {
  const { classes } = props;

  return (
    <Grid container alignItems="center">
      <Grid item sm={6}>
        <div className={classes.leftContainer}>
          <Picture path="index/jenny.webp" fallbackType="png" alt="Professional woman" className={classes.picture} />
        </div>
      </Grid>
      <Grid item sm={6}>
        <div className={classes.rightContainer}>
          <StoryStepper />
          <Button variant="contained" color="secondary" className={classes.button}>
            Watch success stories
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Stories);
