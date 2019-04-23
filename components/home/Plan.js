import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import Crane from '../Crane';
import SectionContent from './SectionContent';

const styles = theme => ({
});

class Plan extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container alignItems="center" direction="row-reverse">
        <Grid item sm>
          <Crane />
        </Grid>
        <Grid item sm={5}>
          <SectionContent
            title="Build your plan"
            buttonText="Start planning"
          >
            Build a job search plan to lay out all the possible employment options
            you may have in finding a new job. No matter where you are in the job
            search process, having multiple organized plans can help you stay
            motivated and on track. Find tools and templates on how to develop
            plans A, B, and C specific to your industry and interest.
        </SectionContent>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Plan);
