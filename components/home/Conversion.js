import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../Auth';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url('/static/img/index/04_Conversion/Coversion Asset - Desktop-2x.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: theme.spacing(95),
    [theme.breakpoints.down('xs')]: {
      backgroundImage: `url('/static/img/index/04_Conversion/Conversion Asset - Mobile-2x.png')`,
      backgroundPosition: 'bottom center',
    },
  },
  mainContainer: {
    padding: theme.spacing(5),
    width: theme.spacing(80),
    margin: '0 auto',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(65),
    },
  },

  heading: {
    fontFamily: theme.typography.h2.fontFamily,
    fontSize: '3rem',
    color: theme.palette.grey['50'],
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(20),
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

        <Button variant="contained" onClick={handleClick} className={classes.btn}>
          <Typography variant="button">Sign up for free</Typography>
        </Button>
      </div>
    </div>
  );
}

export default Welcome;
