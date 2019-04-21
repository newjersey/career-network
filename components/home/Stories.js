import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import StoryStepper from './StoryStepper';

const styles = theme => ({
});

function Stories(props) {
  const { classes } = props;

  return (
    <Grid container justify="center">
      <Grid item sm={6}></Grid>
      <Grid item sm={6}>
        <StoryStepper />
        <Typography variant="subtitle1">

        </Typography>
        <Button variant="contained" color="secondary">
          Watch success stories
      </Button>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Stories);
