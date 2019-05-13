import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import CircumstancePicker from './CircumstancePicker'

const styles = theme => ({
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
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 3,
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
    marginBottom: theme.spacing.unit * 10,
  },
});

function Hero(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography variant="h6" component="h3">
        Like having a career coach in your pocket
        </Typography>
      <Typography variant="h4" component="h1" className={classes.title}>
        Get <span className={classes.highlight}>inteligent</span> career advice, 
      </Typography>
      <Typography variant="h4" component="h3" className={classes.title}>
      from our New Jersey<span className={classes.highlight}> recomendations engine.</span> 
      </Typography>
      <Typography variant="h5" component="h4" className={classes.title}>
        Work with career coaches to transform how you look for work
      </Typography>
      <CircumstancePicker className={classes.picker} />
    </div>
  );
}

export default withStyles(styles)(Hero);
