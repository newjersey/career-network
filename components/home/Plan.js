import Grid from '@material-ui/core/Grid';
import React from 'react';

import AnimatedSVG from '../AnimatedSVG';
import SectionContent from './SectionContent';

function Plan() {
  return (
    <Grid container alignItems="center" direction="row-reverse">
      <Grid item sm>
        <AnimatedSVG
          path="/static/img/index/crane.svg"
          transform={scrollPercentage => `translate(0, ${scrollPercentage * -1000 + 440})`}
        />
      </Grid>
      <Grid item sm={5}>
        <SectionContent title="We will build you a customized plan" buttonText="Start planning">
          We have interviewed hundreds of career coaches and New Jersey Job seakers. Just answer a
          few questions, and we will help you build a job search plan with goals and action items
          based on your unique situation. No matter where you are in the job search process, we will
          help you stay motivated and on track.
        </SectionContent>
      </Grid>
    </Grid>
  );
}

export default Plan;
