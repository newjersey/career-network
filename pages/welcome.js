import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import NextLink from 'next/link';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { withAuthRequired } from '../components/Auth';
import BackgroundHeader from '../components/BackgroundHeader';
import ScaffoldContainer from '../components/ScaffoldContainer';
import withTitle from '../components/withTitle';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'relative',
    marginTop: theme.spacing(-6),
    padding: theme.spacing(5, 4, 0, 4),
  },
  backgroundHeader: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(14),
    background: `linear-gradient(to right bottom, #ffffff, ${theme.palette.background.secondaryHeader} 100%)`,
  },
  title: {
    maxWidth: '60%',
    fontSize: '20px',
    color: theme.palette.background.dark,
  },
  button: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(1.5, 6, 1.5, 6),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1.5, 3, 1.5, 3),
    },
    color: 'white',
    backgroundColor: theme.palette.background.dark,
  },
}));

function Welcome() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BackgroundHeader className={classes.backgroundHeader}>
        <ScaffoldContainer>
          <Grid container justify="center">
            <Grid item xs={12} sm={12} md={7}>
              <Typography variant="h2" style={{ fontWeight: 700 }} gutterBottom>
                Welcome to the New Jersey Career Network!
              </Typography>
              <Typography variant="h6">
                We are here to help you along your career journey. Let’s do this together!
              </Typography>
            </Grid>
          </Grid>
        </ScaffoldContainer>
      </BackgroundHeader>
      <ScaffoldContainer>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={7}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5" className={classes.title} gutterBottom>
                Answer a few questions to set up your NJCN profile
              </Typography>
              <Typography variant="body2" style={{ maxWidth: '60%' }}>
                The more we get to know you, the more we will be able to provide you with custom
                assistance.
              </Typography>
              <NextLink href="/assessment">
                <Button className={classes.button} variant="contained" color="primary">
                  Let’s Start
                </Button>
              </NextLink>
              <img
                style={{ position: 'absolute', right: 0, bottom: 0 }}
                src="/static/img/upfront-assessment-welcome.png"
                alt="Upfront Assessment Welcome"
              />
            </Paper>
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

export default withAuthRequired(withTitle(Welcome, 'Welcome'));
