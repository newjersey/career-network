import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import NextLink from 'next/link';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 2, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0.5, 2, 0.8),
    },
    marginBottom: theme.spacing(8),
  },
}));

function ActionPlanBar() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={3} data-intercom="sentiment-container">
      <Grid container direction="row" justify="space-evenly" alignItems="center">
        <Grid item xs={12} sm={4} md={4}>
          <NextLink href="/progress">
            <Button fullWidth style={{ backgroundColor: '#edf6fd' }}>
              <Box>
                <Typography variant="h6">6 of 5</Typography>
                <Typography variant="body2">Goals Completed this Week</Typography>
              </Box>
            </Button>
          </NextLink>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <NextLink href="/progress">
            <Button fullWidth style={{ backgroundColor: 'rgba(254, 249, 243, 0.8)' }}>
              <Box>
                <Typography variant="h6">6 of 5</Typography>
                <Typography variant="body2">Activities Logged this Week</Typography>
              </Box>
            </Button>
          </NextLink>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <NextLink href="/application-tracker">
            <Button fullWidth style={{ backgroundColor: 'rgba(247, 250, 243, 0.8)' }}>
              <Box>
                <Typography variant="h6">6 of 5</Typography>
                <Typography variant="body2">Applications Added this Week</Typography>
              </Box>
            </Button>
          </NextLink>
        </Grid>
      </Grid>
    </Paper>
  );
}

ActionPlanBar.propTypes = {};

export default ActionPlanBar;
