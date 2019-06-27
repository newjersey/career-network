import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    paddingBottom: '3em',
    [theme.breakpoints.up('sm')]: {
      backgroundImage: 'url(/static/img/index/hero.svg)',
      paddingBottom: '5em',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '30vw',
      paddingBottom: 'default',
    },
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.only('sm')]: {
      maxWidth: '56%',
    },
  },
  highlight: {
    color: theme.palette.primary.main,
  },
  picker: {
    marginBottom: theme.spacing(10),
  },
}));

function Hero() {
  const classes = useStyles();
  const { showSignIn } = useAuth();

  return (
    <div className={classes.root}>
      <Typography variant="h6" component="h3">
        We’ll guide you from start to finish
      </Typography>
      <Typography variant="h4" component="h1" className={classes.title}>
        Get a
        {' '}
        <span className={classes.highlight}>personalized</span>
        {' '}
        career-search
        {' '}
        <span className={classes.highlight}>plan</span>
      </Typography>

      <Button variant="contained" size="large" color="primary" onClick={showSignIn}>
        Get Started Today
      </Button>
    </div>
  );
}

export default Hero;
