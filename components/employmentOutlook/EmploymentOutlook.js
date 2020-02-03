import { makeStyles } from '@material-ui/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import NextLink from 'next/link';
import Typography from '@material-ui/core/Typography';

import BackgroundHeader from '../BackgroundHeader';
import ScaffoldContainer from '../ScaffoldContainer';
import Search from './Search';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  button: {
    marginTop: theme.spacing(-6),
    color: 'white',
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(6),
    },
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
      <NextLink href="/dashboard">
        <Button className={classes.button}>
          <ArrowBackIcon />
          Return to Dashboard
        </Button>
      </NextLink>
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
            <Search />
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

export default EmploymentOutlook;
