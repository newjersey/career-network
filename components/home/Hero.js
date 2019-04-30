import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import CircumstancePicker from './CircumstancePicker'

const styles = theme => ({
  root: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    [theme.breakpoints.up('sm')]: {
      backgroundImage: 'url(/static/img/index/hero.svg)',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '30vw',
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
        You're not alone
        </Typography>
      <Typography variant="h4" component="h1" className={classes.title}>
        It takes a <span className={classes.highlight}>network</span> to find the right <span className={classes.highlight}>career</span>
      </Typography>
      <CircumstancePicker className={classes.picker} />
    </div>
  );
}

export default withStyles(styles)(Hero);
