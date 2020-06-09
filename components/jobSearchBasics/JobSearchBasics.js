import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  section: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
  },
}));

export default function CovidResources() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid className={classes.section} container justify="center">
          <Grid item xs={12} sm={7}>
            <Typography component="h1" variant="h3">
              Components of a Successful Job Search
            </Typography>
            <Box>
              <Typography variant="h6">Finding Job Opportunities</Typography>
              <Typography variant="body1">
                Expand your approach to finding jobs that match your needs and interests.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">Applying for Jobs</Typography>
              <Typography variant="body1">
                Stand out in today’s crowded job market by telling your story effectively.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">Taking Care of Yourself</Typography>
              <Typography variant="body1">
                To stay healthy and motivated — because there’s a whole lot more to you than what
                you do for work.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}
