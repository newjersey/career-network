import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';

import Oval from './Oval';
import SectionContent from './SectionContent';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      height: '400px',
      paddingTop: '4rem',
    },
  },
  state: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      position: 'relative',
      top: '-2rem',
      right: '1rem',
    },
  },
  center: {
    textAlign: 'center',
  },
}));

function Resources() {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Hidden smDown implementation="js">
        <Grid item md={3} className={classes.center} style={{ alignSelf: 'flex-start' }}>
          <Oval />
        </Grid>
        <Grid item md={3} className={classes.center} style={{ alignSelf: 'flex-end' }}>
          <Oval />
        </Grid>
      </Hidden>
      <Hidden xsDown implementation="js">
        <Grid item sm={4} md={2} className={classes.state}>
          <Oval variant="state" />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={7} md={4}>
        <SectionContent
          title="Connect with State and local resources"
          buttonText="See your resources"
        >
          Get connected with Unemployment Insurance, find One-Stop locations near you,
          explore social services, and find out more about education and training.
        </SectionContent>
      </Grid>
    </Grid>
  );
}

export default Resources;
