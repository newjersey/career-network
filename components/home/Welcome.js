import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url('/static/img/index/02_Welcome/Welcome Graphic - Desktop-2x.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
    backgroundSize: 'cover',
  },
  mainContainer: {
    padding: theme.spacing(5),
    width: theme.spacing(85),
    height: theme.spacing(80),
    margin: '0 auto',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(65),
    },
  },
  divider: {
    margin: '5vh 45% 5vh',
    backgroundColor: theme.palette.background.dark,
  },
  heading: {
    fontFamily: theme.typography.h2.fontFamily,
    fontSize: '3rem',
    color: theme.palette.background.dark,
    marginTop: theme.spacing(15),
  },
  body: {
    color: theme.palette.grey['800'],
  },
}));

function Welcome() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.mainContainer}>
        <Typography variant="h1" className={classes.heading}>
          Welcome to the new tool at your disposal.
        </Typography>
        <Divider className={classes.divider} />
        <Typography className={classes.body}>
          You may have used Linkedin, Monster, and Indeed. This is not another job board. This is a
          new tool that can help grow your skill set, and change how you approach your job search
          entirely.
        </Typography>
      </div>
    </div>
  );
}

export default Welcome;
