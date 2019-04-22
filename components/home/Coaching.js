import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import SectionContent from './SectionContent';

const styles = theme => ({
  image: {
    width: '100%',
  }
});

function PlanCoaching(props) {
  const { classes } = props;

  return (
    <Grid container alignItems="center">
      <Grid item sm>
        <object type="image/svg+xml" data="/static/img/index/coaching.svg" className={classes.image} />
      </Grid>
      <Grid item sm={5}>
        <SectionContent
          title="Get coaching"
          buttonText="Get started with coaching"
        >
          Self-coaching strategies, peer coaching groups and one-on-one expert
          coaching are all available. Learn how to be your own coach through
          tips and strategies to hold yourself accountable during the job
          search process. Develop peer-support networks to trade job search
          tips and advice. Receive individualized assistance from a career
          coach to help you upgrade your job search skills, identify a new
          career direction, and land that new job.
      </SectionContent>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(PlanCoaching);
