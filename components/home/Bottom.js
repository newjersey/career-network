import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../Auth';

const margins = '3.5rem auto';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url('/static/img/index/08_Bottom Graphic/Bottom Graphic - Desktop-2x.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
    backgroundSize: 'cover',
  },
  mainContainer: {
    padding: theme.spacing(10),
    paddingBottom: theme.spacing(40),
  },
  btnContainer: {
    margin: margins,
    textAlign: 'center',
    width: theme.spacing(60),
  },
  heading: {
    fontFamily: theme.typography.h2.fontFamily,
    fontSize: '3rem',
    color: theme.palette.background.dark,
    margin: margins,
    textAlign: 'center',
    width: theme.spacing(60),
  },
  body: {
    textAlign: 'center',
    margin: margins,
    width: theme.spacing(60),
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
        <Typography variant="h1" className={classes.heading}>
          Get started today.
        </Typography>
        <Typography className={classes.body}>
          Getting a job can be hard, but the New Jersey Career Network is your resource along your
          journey.
        </Typography>
        <div className={classes.btnContainer}>
          <Button variant="contained" color="primary" onClick={handleClick} className={classes.btn}>
            <Typography variant="button">Sign up for free</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
