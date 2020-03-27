import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from './ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2, 1),
    backgroundColor: '#f1f1f5',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <>
      <Paper elevation={3} className={classes.paper}>
        <ScaffoldContainer>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar className={classes.avatar}>
                <NotificationImportantIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography>
                If you have urgent questions here are some resources that New Jersey has made
                available for residents.
              </Typography>
            </Grid>
            <Grid item>
              <Button href="https://covid19.nj.gov/" target="_blank" color="primary" size="large">
                <strong>learn more</strong>
              </Button>
            </Grid>
          </Grid>
        </ScaffoldContainer>
      </Paper>
      <Divider />
    </>
  );
}

export default Banner;
