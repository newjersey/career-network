import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import BackgroundHeader from '../BackgroundHeader';
import ScaffoldContainer from '../ScaffoldContainer';
import Search from './Search';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(10),
  },
}));

function EmploymentOutlook() {
  const classes = useStyles();

  return (
    <div>
      <BackgroundHeader>
        <ScaffoldContainer>
          <Typography component="h1" variant="h2" gutterBottom>
            Employment Outlook
          </Typography>
          <Typography variant="subtitle1">
            Learn about the outlook in your area for the occupation that you want. Using the New
            Jersey Department of Labor projections for employment you can find out how favorable
            different jobs are across the state.
          </Typography>
        </ScaffoldContainer>
      </BackgroundHeader>
      <ScaffoldContainer>
        <Grid className={classes.container} container justify="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Occupation
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '2em' }}>
              What job are you looking for? Select the job that most closely matches the one you are
              looking for.
            </Typography>
            <Search />
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

export default EmploymentOutlook;
