import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import CircumstancePicker from './CircumstancePicker'

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
    [theme.breakpoints.down(350)]: {
      fontSize: '1.8rem',
    },
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

  return (
    <div className={classes.root}>
      <Typography variant="h6" component="h3">
        You're not alone
        </Typography>
      <Typography variant="h4" component="h1" className={classes.title}>
        It takes a <span className={classes.highlight}>network</span> to find the right <span className={classes.highlight}>career</span>
      </Typography>
      <CircumstancePicker className={classes.picker} />
    </div>
  );
}

export default Hero;
