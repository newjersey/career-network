import Grid from '@material-ui/core/Grid';
import React from 'react';

import AnimatedSVG from '../AnimatedSVG';
import SectionContent from './SectionContent';

function PlanCoaching() {
  return (
    <Grid container alignItems="center">
      <Grid item sm>
        <AnimatedSVG
          path="/static/img/index/coaching.svg"
          // transform={scrollPercentage => `rotate(${scrollPercentage * -180 - 225} 357.5 141.1)`}
          transform={scrollPercentage => `rotate(${scrollPercentage * 300 + 200} 357.5 141.1)`}
        />
      </Grid>
      <Grid item sm={5}>
        <SectionContent
          title="Get personalized coaching"
          buttonText="Get started"
        >
          Self-coaching strategies and one-on-one expert coaching through
          our chat and in person are all available. Learn how to be your own coach
          through tips and strategies to hold yourself accountable during the job
          search process. Develop peer-support networks to trade job search
          tips and advice. Receive individualized assistance from a career
          coach to help you upgrade your job search skills, identify a new
          career direction, and land that new job.
        </SectionContent>
      </Grid>
    </Grid>
  );
}

export default PlanCoaching;
