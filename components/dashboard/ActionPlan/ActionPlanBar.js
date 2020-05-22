import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import Grid from '@material-ui/core/Grid';
import NextLink from 'next/link';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../../Auth';
import FirebasePropTypes from '../../Firebase/PropTypes';

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

function ActionPlanBar({ userStats, actionPlan }) {
  const classes = useStyles();
  const { userDocRef } = useAuth();

  // reset actionPlan and weekly stats on Monday
  const today = new Date();
  if (today.getDay() === 5) {
    const lastUpdatedDate =
      actionPlan && actionPlan.lastUpdatedTimestamp && actionPlan.lastUpdatedTimestamp.toDate();
    if (!lastUpdatedDate || lastUpdatedDate.toDateString() !== today.toDateString()) {
      const data = {
        goals: 3,
        activities: 3,
        applications: 3,
        lastUpdatedTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      userDocRef.set({ actionPlan: data }, { merge: true });

      const stats = {
        weeklyActivitiesCount: 0,
        weeklyTasksCount: 0,
        weeklyApplicationsCount: 0,
        weeklyActivitiesLatestTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
        weeklyTasksLatestTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
        weeklyApplicationsLatestTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      userDocRef.set({ stats }, { merge: true });
    }
  }

  return (
    <Paper className={classes.paper} elevation={3} data-intercom="sentiment-container">
      <Grid container direction="row" justify="space-evenly" alignItems="center">
        <Grid item xs={12} sm={4} md={4}>
          <NextLink href="/progress">
            <Button fullWidth style={{ backgroundColor: '#edf6fd' }}>
              <Box>
                <Typography variant="h6">
                  {userStats.weeklyTasksCount || 0} of {actionPlan.goals || 0}
                </Typography>
                <Typography variant="body2">Goals Completed this Week</Typography>
              </Box>
            </Button>
          </NextLink>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <NextLink href="/progress">
            <Button fullWidth style={{ backgroundColor: 'rgba(254, 249, 243, 0.8)' }}>
              <Box>
                <Typography variant="h6">
                  {userStats.weeklyActivitiesCount || 0} of {actionPlan.activities || 0}
                </Typography>
                <Typography variant="body2">Activities Logged this Week</Typography>
              </Box>
            </Button>
          </NextLink>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <NextLink href="/application-tracker">
            <Button fullWidth style={{ backgroundColor: 'rgba(247, 250, 243, 0.8)' }}>
              <Box>
                <Typography variant="h6">
                  {userStats.weeklyApplicationsCount || 0} of {actionPlan.applications || 0}
                </Typography>
                <Typography variant="body2">Applications Added this Week</Typography>
              </Box>
            </Button>
          </NextLink>
        </Grid>
      </Grid>
    </Paper>
  );
}

ActionPlanBar.propTypes = {
  userStats: PropTypes.shape({
    activityLogEntriesCount: PropTypes.number,
    weeklyActivitiesCount: PropTypes.number,
    weeklyTasksCount: PropTypes.number,
    weeklyApplicationsCount: PropTypes.number,
  }),
  actionPlan: PropTypes.shape({
    goals: PropTypes.number,
    activities: PropTypes.number,
    applications: PropTypes.number,
    lastUpdatedTimestamp: FirebasePropTypes.timestamp,
  }),
};

ActionPlanBar.defaultProps = {
  userStats: {
    activityLogEntriesCount: 0,
    weeklyActivitiesCount: 0,
    weeklyTasksCount: 0,
    weeklyApplicationsCount: 0,
  },
  actionPlan: PropTypes.shape({
    goals: 0,
    activities: 0,
    applications: 0,
  }),
};

export default ActionPlanBar;
