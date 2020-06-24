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
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5),
    },
  },
  textContainer: {
    paddingLeft: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      marginBottom: theme.spacing(8),
    },
  },
  heading: {
    fontSize: '3.5rem',
    color: theme.palette.background.dark,
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2.2rem',
    },
  },
  body: {
    color: theme.palette.grey['800'],
  },
  img: {
    width: theme.spacing(60),
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(35),
    },
  },
  btn: {
    marginTop: theme.spacing(5),
    width: theme.spacing(32),
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
      <Grid container justify="space-between" alignItems="center" className={classes.mainContainer}>
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
          <img src={HERO_ILLUSTRATION} alt="main graphic" className={classes.img} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Hero;
