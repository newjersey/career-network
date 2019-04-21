import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import CircumstancePicker from './CircumstancePicker'

const styles = theme => ({
  title: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.down(350)]: {
      fontSize: '1.8rem',
    },
  },
  highlight: {
    color: theme.palette.primary.main,
  },
  picker: {
    marginBottom: theme.spacing.unit * 10,
  }
});

function Hero(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" component="h3">
        You're not alone
        </Typography>
      <Typography variant="h4" component="h1" className={classes.title}>
        It takes a <span className={classes.highlight}>network</span> to find the right <span className={classes.highlight}>career</span>
      </Typography>
      <CircumstancePicker className={classes.picker} />
    </React.Fragment>
  );
}

export default withStyles(styles)(Hero);
