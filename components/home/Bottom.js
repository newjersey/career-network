import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../Auth';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url('/static/img/index/08_Bottom Graphic/Bottom Graphic - Desktop-2x.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom center',
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      backgroundImage: `url('/static/img/index/08_Bottom Graphic/Bottom Graphic - Mobile-2x.png')`,
      backgroundPosition: 'bottom center',
    },
  },
  mainContainer: {
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(40),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    textAlign: 'center',
  },
  heading: {
    color: theme.palette.background.dark,
  },
  body: {
    color: theme.palette.grey['800'],
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  btn: {
    width: theme.spacing(33),
    height: theme.spacing(8),
  },
}));

function Welcome() {
  const classes = useStyles();

  const { showSignIn } = useAuth();

  const handleClick = () => showSignIn();

  return (
    <div className={classes.root}>
      <div className={classes.mainContainer}>
        <Grid container justify="center" alignItems="center">
          <Grid item md={5}>
            <Typography variant="h1" className={classes.heading}>
              Get started today.
            </Typography>
            <Typography variant="body1" className={classes.body}>
              Getting a job can be hard, but the New Jersey Career Network is your resource along
              your journey.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              className={classes.btn}
            >
              <Typography variant="button">Sign up for free</Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Welcome;
