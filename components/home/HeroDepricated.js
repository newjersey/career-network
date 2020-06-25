import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundSize: '33vw',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top right',
    paddingBottom: '3em',
    [theme.breakpoints.up('sm')]: {
      backgroundImage: 'url(/static/img/index/hero.svg)',
      paddingBottom: '6em',
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
  about: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      maxWidth: '56%',
    },
  },
}));

function HeroDepricated() {
  const classes = useStyles();
  const { showSignIn } = useAuth();

  return (
    <div className={classes.root}>
      <Typography variant="h6" component="h3">
        We’ll guide you from start to finish
      </Typography>
      <Typography variant="h4" component="h1" className={classes.title}>
        Get a <span className={classes.highlight}>personalized</span> career-search{' '}
        <span className={classes.highlight}>plan</span>
      </Typography>

      <Button variant="contained" size="large" color="primary" onClick={showSignIn}>
        Get Started Today
      </Button>

      <Typography className={classes.about}>
        Job search is hard. We can help. By answering some questions about your search, our expert
        system can make customized recommendations about next steps, with curated resources to help
        you complete them. Each day you’ll receive additional recommended tasks that will help you
        stay focused on the right activities for your search. And as you complete them and report on
        your progress, our digital coach will learn what’s working and help you refine and focus on
        the activities that work best for you.
      </Typography>
    </div>
  );
}

export default HeroDepricated;
