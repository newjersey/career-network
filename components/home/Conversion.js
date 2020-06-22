import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../Auth';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url('/static/img/index/04_Conversion/Conversion Asset - Desktop-2x.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundColor: theme.palette.background.dark,
    height: theme.spacing(80),
    borderRadius: '0 0 40% 40%',
    overflow: 'hidden',
    borderBottom: 'solid 3.5rem white',
  },
  mainContainer: {
    padding: theme.spacing(12),
    paddingTop: theme.spacing(15),
  },
  btnContainer: {
    margin: '3.5rem auto',
    textAlign: 'center',
    width: theme.spacing(65),
  },
  heading: {
    fontFamily: theme.typography.h2.fontFamily,
    fontSize: '3rem',
    color: theme.palette.grey['50'],
    margin: '3.5rem auto',
    textAlign: 'center',
    width: theme.spacing(65),
  },
  btn: {
    backgroundColor: 'white',
    color: theme.palette.background.dark,
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
          Change the way you look for jobs.
        </Typography>
        <div className={classes.btnContainer}>
          <Button variant="contained" onClick={handleClick} className={classes.btn}>
            <Typography variant="button">Sign up for free</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
