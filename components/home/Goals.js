import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';

import Oval from './Oval';
import SectionContent from './SectionContent';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  center: {
    textAlign: 'center',
  },
}));

function Goals() {
  const classes = useStyles();

  return (
    <Grid container alignItems="flex-start">
      <Hidden smDown implementation="js">
        <Grid item md={3} className={classes.center}>
          <Oval variant="phone" />
        </Grid>
      </Hidden>
      <Hidden xsDown mdUp implementation="js">
        <Grid item sm={1} />
      </Hidden>
      <Grid item xs={12} sm={7} md={3}>
        <SectionContent title="Stay on track" buttonText="Get started today">
          Our digital coach is designed to help you reach your career goals through personalized
          guidance that continually updates as you progress through the job search process.
        </SectionContent>
      </Grid>
      <Hidden xsDown mdUp implementation="js">
        <Grid item sm={4} className={classes.center}>
          <Oval variant="phone" />
        </Grid>
      </Hidden>
      <Hidden smDown implementation="js">
        <Grid item md={6}>
          <Oval style={{ margin: '140px 0' }} />
        </Grid>
      </Hidden>
    </Grid>
  );
}

export default Goals;
