import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import NextLink from 'next/link';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FirebasePropTypes from '../../Firebase/PropTypes';
import { useAuth } from '../../Auth';

const PLAN_COLORS = {
  goal: '#1980c8',
  activity: '#f29a38',
  application: '#7ea94f',
};

const ACTION_PLAN_DEFAULT = {
  goals: 5,
  activities: 6,
  applications: 2,
};

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 2, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0.5, 2, 0.8),
    },
    marginBottom: theme.spacing(8),
  },
  iconContainer: {
    position: 'absolute',
    top: theme.spacing(1.5),
    left: theme.spacing(3.3),
    border: `3px solid`,
    borderRadius: '50%',
    lineHeight: 0,
    padding: theme.spacing(1),
  },
  text: {
    textTransform: 'none',
    textAlign: 'left',
    marginLeft: '1rem',
  },
}));

function ActionPlanBar({ userStats, actionPlan }) {
  const classes = useStyles();
  const { userDocRef } = useAuth();

  // reset actionPlan and weekly stats on Monday
  const todaysDate = new Date();
  if (
    !actionPlan ||
    !actionPlan.lastUpdatedTimestamp ||
    (todaysDate.getDay() === 1 &&
      actionPlan.lastUpdatedTimestamp.toDate().toDateString() !== todaysDate.toDateString())
  ) {
    const initialPlan = {
      ...ACTION_PLAN_DEFAULT,
      lastUpdatedTimestamp: new Date(),
    };
    userDocRef.set({ actionPlan: initialPlan }, { merge: true });

    const stats = {
      weeklyActivitiesCount: 0,
      weeklyTasksCount: 0,
      weeklyApplicationsCount: 0,
      weeklyActivitiesLatestTimestamp: new Date(),
      weeklyTasksLatestTimestamp: new Date(),
      weeklyApplicationsLatestTimestamp: new Date(),
    };
    userDocRef.set({ stats }, { merge: true });
  }

  return (
    <Paper className={classes.paper} elevation={3} data-intercom="sentiment-container">
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        spacing={1}
        style={{ paddingTop: '0.3rem', paddingBottom: '0.3rem' }}
      >
        <Grid item xs={12} sm={4} md={4}>
          <NextLink href="/progress">
            <Button fullWidth style={{ backgroundColor: fade(PLAN_COLORS.goal, 0.08) }}>
              <Box>
                <div
                  className={classes.iconContainer}
                  style={{ color: PLAN_COLORS.goal, borderColor: PLAN_COLORS.goal }}
                >
                  <VpnKeyIcon />
                </div>
                <Typography className={classes.text} variant="h6">
                  <span style={{ color: PLAN_COLORS.goal }}>{userStats.weeklyTasksCount || 0}</span>{' '}
                  of {actionPlan.goals || 0}
                </Typography>
                <Typography className={classes.text} variant="body2">
                  Goals Completed this Week
                </Typography>
              </Box>
            </Button>
          </NextLink>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <NextLink href="/progress">
            <Button fullWidth style={{ backgroundColor: fade(PLAN_COLORS.activity, 0.08) }}>
              <Box>
                <div
                  className={classes.iconContainer}
                  style={{ borderColor: PLAN_COLORS.activity, color: PLAN_COLORS.activity }}
                >
                  <AssignmentTurnedInIcon />
                </div>
                <Typography className={classes.text} variant="h6">
                  <span style={{ color: PLAN_COLORS.activity }}>
                    {userStats.weeklyActivitiesCount || 0}
                  </span>{' '}
                  of {actionPlan.activities || 0}
                </Typography>
                <Typography className={classes.text} variant="body2">
                  Activities Logged this Week
                </Typography>
              </Box>
            </Button>
          </NextLink>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <NextLink href="/application-tracker">
            <Button fullWidth style={{ backgroundColor: fade(PLAN_COLORS.application, 0.08) }}>
              <Box>
                <div
                  className={classes.iconContainer}
                  style={{ borderColor: PLAN_COLORS.application, color: PLAN_COLORS.application }}
                >
                  <NextWeekIcon />
                </div>
                <Typography className={classes.text} variant="h6">
                  <span style={{ color: PLAN_COLORS.application }}>
                    {userStats.weeklyApplicationsCount || 0}
                  </span>{' '}
                  of {actionPlan.applications || 0}
                </Typography>
                <Typography className={classes.text} variant="body2">
                  Applications Added this Week
                </Typography>
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
    lastUpdatedTimestamp: FirebasePropTypes.timestamp.isRequired,
  }),
};

ActionPlanBar.defaultProps = {
  userStats: {
    activityLogEntriesCount: 0,
    weeklyActivitiesCount: 0,
    weeklyTasksCount: 0,
    weeklyApplicationsCount: 0,
  },
  actionPlan: {
    goals: 0,
    activities: 0,
    applications: 0,
    lastUpdatedTimestamp: null,
  },
};

export default ActionPlanBar;
