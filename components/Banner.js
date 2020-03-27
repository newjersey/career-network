import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2, 1, 1, 2),
    backgroundColor: theme.palette.background.default,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <Grid container spacing={16} alignItems="space-between">
          <Grid item>
            <Avatar className={classes.avatar}>
              <NotificationImportantIcon />
            </Avatar>
            <Typography>
              If you have urgent questions here are some resources that New Jersey has made
              available for residents.
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Button color="primary">learn more</Button>
        </Grid>
      </Paper>
      <Divider />
      <CssBaseline />
    </>
  );
}

export default Banner;
