import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import BackgroundHeader from '../BackgroundHeader';
import ScaffoldContainer from '../ScaffoldContainer';
import Search from './Search';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(10),
  },
}));

function EmploymentOutlook() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BackgroundHeader>
        <ScaffoldContainer>
          <Typography component="h1" variant="h2" style={{ fontWeight: 700 }} gutterBottom>
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
          <Grid item xs={12} md={7}>
            <Search />
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

export default EmploymentOutlook;
