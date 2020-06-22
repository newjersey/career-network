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
      margin: `6rem auto`,
    },
  },
  mainContainer: {
    height: theme.spacing(50),
  },
  contentContainer: {
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(12),
  },
  paper: {
    width: theme.spacing(115),
    height: theme.spacing(40),
    backgroundImage: `url('/static/img/index/06_Pull Quote/Pull Quote - Desktop-2x.png')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  heading: {
    paddingBottom: theme.spacing(3),
  },
  icon: {
    fontSize: '3rem',
    transform: 'rotate(180deg) scaleX(1)',
  },
}));

function Quote() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.mainContainer}>
        <Paper className={classes.paper} elevation={10}>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            className={classes.contentContainer}
          >
            <Grid item md={1}>
              <FormatQuoteIcon className={classes.icon} />
            </Grid>
            <Grid item md={6}>
              <Typography variant="h4" className={classes.heading}>
                Unique. I’ve{' '}
                <b>
                  never seen <br /> anything{' '}
                </b>
                like New Jersey Career Network before.”
              </Typography>
              <Typography variant="subtitle1">– Verified New Jersey Career Network User</Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default Quote;
