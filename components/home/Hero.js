import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../Auth';

const HERO_ILLUSTRATION = '/static/img/index/01_Hero/Hero Illustration - Desktop-2x.png';

const useStyles = makeStyles(theme => ({
  root: {
    background: '#EBF9FA',
    width: '100%',
  },
  mainContainer: {
    padding: theme.spacing(12),
  },
  textContainer: {
    paddingLeft: theme.spacing(5),
  },
  heading: {
    fontFamily: theme.typography.h2.fontFamily,
    fontSize: '3.8rem',
    color: theme.palette.background.dark,
    marginBottom: theme.spacing(5),
  },
  body: {
    color: theme.palette.grey['800'],
  },
  illustration: {
    width: theme.spacing(46),
    height: '100%',
  },
  btn: {
    marginTop: theme.spacing(5),
    width: theme.spacing(33),
    height: theme.spacing(8),
  },
  btnText: {
    fontWeight: 'bold',
  },
}));

function Hero() {
  const classes = useStyles();

  const { showSignIn } = useAuth();

  const handleClick = () => showSignIn();

  return (
    <div className={classes.root}>
      <Grid container justify="space-evenly" alignItems="center" className={classes.mainContainer}>
        <Grid item xs={12} md={5} className={classes.textContainer}>
          <Typography variant="h1" className={classes.heading}>
            Change the way you look for jobs.
          </Typography>

          <Typography variant="body1" className={classes.body}>
            The New Jersey Career Network is your free resource to help find meaningful work.
            Elevate your search with our interactive tool, designed to help you land the job you
            want.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClick} className={classes.btn}>
            <Typography variant="button" className={classes.bntText}>
              Sign up for free
            </Typography>
          </Button>
        </Grid>
        <Grid item container xs={12} md={6} justify="center">
          <img src={HERO_ILLUSTRATION} alt="main graphic" className={classes.illustration} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Hero;
