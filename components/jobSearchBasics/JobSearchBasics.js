import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../ScaffoldContainer';
import FindingJob from './FindingJob';
import ApplyForJob from './ApplyForJob';
import Health from './Health';

const useStyles = makeStyles(theme => ({
  navContainer: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
  },
  navText: {
    color: theme.palette.background.dark,
  },
  title: {
    fontWeight: 500,
    lineHeight: '4.25rem',
  },
  circle: {
    background: `linear-gradient(to right top, #304ffe, #ffffff 100%)`,
    borderRadius: '50%',
    width: '400px',
    height: '400px',
    marginTop: theme.spacing(12),
  },
}));

export default function JobSearchBasics() {
  const classes = useStyles();

  return (
    <div>
      <ScaffoldContainer>
        <Grid className={classes.navContainer} container justify="center">
          <Grid item xs={12} sm={5} className={classes.navText}>
            <Typography className={classes.title} component="h1" variant="h3">
              Components
              <br />
              of a Successful
              <br />
              Job Search
            </Typography>
            <Box mt={4}>
              <Typography variant="h6">Finding Job Opportunities</Typography>
              <Typography variant="body1">
                Expand your approach to finding jobs that match your needs and interests.
              </Typography>
            </Box>
            <Box mt={4}>
              <Typography variant="h6">Applying for Jobs</Typography>
              <Typography variant="body1">
                Stand out in today’s crowded job market by telling your story effectively.
              </Typography>
            </Box>
            <Box mt={4}>
              <Typography variant="h6">Taking Care of Yourself</Typography>
              <Typography variant="body1">
                To stay healthy and motivated — because there’s a whole lot more to you than what
                you do for work.
              </Typography>
            </Box>
          </Grid>
          <Grid item container xs={12} sm={5} justify="center">
            <div className={classes.circle} />
          </Grid>
        </Grid>
      </ScaffoldContainer>
      <FindingJob />
      <ApplyForJob />
      <Health />
    </div>
  );
}
