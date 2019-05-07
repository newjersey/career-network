import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';

import SectionContent from './SectionContent';

const styles = theme => ({
  center: {
    textAlign: 'center',
  },
  rightOval: {
    margin: '140px 0',
  },
});

function Goals(props) {
  const { classes } = props;

  return (
    <Grid container alignItems="flex-start">
      <Hidden smDown implementation="js">
        <Grid item md={3} className={classes.center}>
          <img src="/static/img/index/oval-phone.svg" />
        </Grid>
      </Hidden>
      <Hidden xsDown mdUp implementation="js">
        <Grid item sm={1}></Grid>
      </Hidden>
      <Grid item xs={12} sm={7} md={3}>
        <SectionContent
          title="Stay on track"
          buttonText="Start making goals"
        >
          Get reminders when you set goals sent to
          your phone, email, or sync them with your
          calander, designed to help you suceed.
        </SectionContent>
      </Grid>
      <Hidden xsDown mdUp implementation="js">
        <Grid item sm={4} className={classes.center}>
          <img src="/static/img/index/oval-phone.svg" />
        </Grid>
      </Hidden>
      <Hidden smDown implementation="js">
        <Grid item md={6}>
          <img src="/static/img/index/oval.svg" className={classes.rightOval} />
        </Grid>
      </Hidden>
    </ Grid>
  );
}

export default withStyles(styles)(Goals);
