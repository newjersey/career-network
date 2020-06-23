import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    '& .MuiPaper-root': {
      margin: '6rem auto',
      [theme.breakpoints.down('xs')]: {
        margin: '0 auto',
      },
    },
    '& .MuiPaper-elevation15': {
      boxShadow:
        '0px 14px 20px 0px rgba(0,0,0,0.00), 0px 15px 22px 2px rgba(0,0,0,0.1), 0px 6px 28px 5px rgba(0,0,0,0.05)',
    },
  },
  mainContainer: {
    height: theme.spacing(50),
    marginBottom: theme.spacing(10),
  },
  contentContainer: {
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(12),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(3),
    },
  },
  paper: {
    width: theme.spacing(115),
    height: theme.spacing(40),
    backgroundImage: `url('/static/img/index/06_Pull Quote/Pull Quote - Desktop-2x.png')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(50),
      height: theme.spacing(56),
      backgroundImage: `url('/static/img/index/06_Pull Quote/Pull Quote - Mobile-2x.png')`,
    },
  },
  heading: {
    paddingBottom: theme.spacing(3),
    color: theme.palette.background.dark,
  },
  cite: {
    color: theme.palette.background.dark,
  },
  icon: {
    fontSize: '3rem',
    transform: 'rotate(180deg) scaleX(1)',
    color: theme.palette.background.dark,
  },
}));

function Quote() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.mainContainer}>
        <Paper className={classes.paper} elevation={15}>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            className={classes.contentContainer}
          >
            <Grid item md={1}>
              <FormatQuoteIcon className={classes.icon} />
            </Grid>
            <Grid md={6}>
              <Typography variant="h4" className={classes.heading}>
                Unique. I’ve{' '}
                <b>
                  never seen <br /> anything{' '}
                </b>
                like New Jersey Career Network before.”
              </Typography>
              <Typography variant="subtitle1" className={classes.cite}>
                – Verified New Jersey Career Network User
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default Quote;
