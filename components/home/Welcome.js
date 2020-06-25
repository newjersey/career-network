import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url('/static/img/index/02_Welcome/Welcome_Graphic_Desktop-2x.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
    backgroundSize: 'cover',
  },
  mainContainer: {
    height: theme.spacing(80),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    textAlign: 'center',
  },
  divider: {
    margin: '5vh 45% 5vh',
    backgroundColor: theme.palette.background.dark,
  },
  heading: {
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
        <Grid container justify="center" alignItems="center">
          <Grid item md={5}>
            <Typography variant="h1" className={classes.heading}>
              Welcome to the new tool at your disposal.
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="body1" className={classes.body}>
              You may have used Linkedin, Monster, and Indeed. This is not another job board. This
              is a new tool that can help grow your skill set, and change how you approach your job
              search entirely.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Welcome;
