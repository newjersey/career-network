import { compareDesc, getMonth, getYear } from 'date-fns';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CalendarIcon from '@material-ui/icons/CalendarTodayRounded';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

import ActivityInputDialog from '../activityInput/ActivityInputDialog';
import ActionStatsCard from './ActionStatsCard';
import AirtablePropTypes from '../Airtable/PropTypes';
import BackgroundHeader from '../BackgroundHeader';
import EmptyState from './EmptyState';
import HistoryPropTypes from './PropTypes';
import ScaffoldContainer from '../ScaffoldContainer';
import ActivityDetailDialog from './ActivityDetailDialog';
import ApplicationHistoryDialog from '../applicationTracker/ApplicationHistory/ApplicationHistoryDialog';
import { ACTION_TYPES } from '../dashboard/ActionPlan/constants';
import { ACTIVITY_TYPES } from '../activityInput/constants';
import ActionItem from './ActionItem';

const useStyles = makeStyles(theme => ({
  backgroundHeader: {
    background: `linear-gradient(to right, #ffffff, #fbe6aa 100%)`,
  },
  pageHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.background.dark,
  },
  calendarIconContainer: {
    marginRight: theme.spacing(1),
  },
  sectionTitle: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    color: theme.palette.background.dark,
    fontSize: '1rem',
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  listItem: {
    marginBottom: theme.spacing(3),
  },
  card: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  statsContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
}));

const unrecognizedCategoryName = AirtablePropTypes.TASK_CATEGORIES.other.name;

const getActivityCategoryName = activityTypeValue => {
  const matchingActivity = ACTIVITY_TYPES.find(
    activityType => activityType.value === activityTypeValue
  );
  return matchingActivity ? matchingActivity.category.name : unrecognizedCategoryName;
};

const DIALOGS = {
  ACTIVITY_INPUT: 'ActivityInputDialog',
  ACTIVITY_DETAIL: 'ActivityDetailDialog',
  APPLICATION_HISTORY: 'ApplicationHistoryDialog',
};

const isInPeriod = (date, period) => {
  return !period || (getMonth(date) === period.month && getYear(date) === period.year);
};

const INITIAL_DIALOG_CONFIG = {};
export default function History(props) {
  const classes = useStyles();
  const { activities, completedTasks, applications } = props;
  const [activeDialog, setActiveDialog] = useState(INITIAL_DIALOG_CONFIG);

  // protect against immediately-created items that don't yet have a server-generated timestamp
  const getTimestamp = item =>
    (item.data().timestamp && item.data().timestamp.toDate()) || new Date();

  const getApplicationTimestamp = statusEntries =>
    (statusEntries[0].timestamp && statusEntries[0].timestamp.toDate()) || new Date();

  const openActivityDetail = selectedActivity =>
    setActiveDialog({
      name: DIALOGS.ACTIVITY_DETAIL,
      activity: selectedActivity,
    });

  const openApplicationDetail = application =>
    setActiveDialog({ name: DIALOGS.APPLICATION_HISTORY, application });

  const openActivityInput = () => setActiveDialog({ name: DIALOGS.ACTIVITY_INPUT });

  const closeActiveDialog = () => setActiveDialog(INITIAL_DIALOG_CONFIG);

  const activitiesTemp = activities.map(a => {
    const { activityTypeValue, dateCompleted, ...activity } = a.data();
    return {
      timestamp: getTimestamp(a),
      props: {
        ...activity,
        categoryName: getActivityCategoryName(activityTypeValue),
        dateCompleted,
        id: a.id,
        title: activity.briefDescription,
        activityTypeValue,
        actionType: ACTION_TYPES.activity,
        openDetails: () => openActivityDetail({ dateCompleted, ...activity }),
      },
    };
  });

  const tasksTemp = completedTasks.map(taskEvent => {
    const { task, timestamp } = taskEvent.data();
    return {
      timestamp: getTimestamp(taskEvent),
      props: {
        ...task,
        categoryName: task.fields.Category || unrecognizedCategoryName,
        title: task.fields.Task,
        why: task.fields.Why,
        dateCompleted: timestamp,
        id: taskEvent.id,
        actionType: ACTION_TYPES.goal,
      },
    };
  });

  const applicationsTemp = applications.map(applicationDocument => {
    const application = applicationDocument.data();
    return {
      timestamp: getApplicationTimestamp(application.statusEntries),
      props: {
        ...application,
        title: `Application Opened for ${application.jobTitle} at ${application.company}`,
        dateCompleted: application.statusEntries[0].timestamp,
        id: applicationDocument.id,
        actionType: ACTION_TYPES.application,
        openDetails: () => openApplicationDetail(application),
      },
    };
  });

  const cards = [...activitiesTemp, ...tasksTemp, ...applicationsTemp].sort((a, b) =>
    compareDesc(a.timestamp, b.timestamp)
  );

  const isEmpty = () => {
    return cards.length === 0;
  };

  // Filtered out Assessment-complete activity since it's not a user logged activity
  const getActivitiesWithoutAssessmentComplete = () => {
    return activitiesTemp.filter(
      activity => activity.props.activityTypeValue !== 'assessment-complete'
    );
  };

  const getActionCount = actionTypeValue => {
    switch (actionTypeValue) {
      case ACTION_TYPES.goal.value:
        return completedTasks.length;
      case ACTION_TYPES.activity.value:
        return getActivitiesWithoutAssessmentComplete().length;
      case ACTION_TYPES.application.value:
        return applications.length;
      default:
        return 0;
    }
  };

  return (
    <div className={classes.root}>
      <ActivityInputDialog
        show={activeDialog.name === DIALOGS.ACTIVITY_INPUT}
        onClose={closeActiveDialog}
      />
      <ActivityDetailDialog
        {...activeDialog}
        show={activeDialog.name === DIALOGS.ACTIVITY_DETAIL}
        onClose={closeActiveDialog}
      />
      <ApplicationHistoryDialog
        {...activeDialog}
        handleClose={closeActiveDialog}
        open={activeDialog.name === DIALOGS.APPLICATION_HISTORY}
      />
      <BackgroundHeader className={classes.backgroundHeader}>
        <ScaffoldContainer className={classes.header}>
          <Grid container justify="center">
            <Grid item xs={12} md={9}>
              <Typography variant="h5">All Actions</Typography>
            </Grid>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={openActivityInput}
              data-intercom="log-activity-button"
            >
              Log An Activity
            </Button>
          </Grid>
        </ScaffoldContainer>
      </BackgroundHeader>
      <ScaffoldContainer>
        <Grid container justify="center">
          <Grid item xs={12} md={9}>
            <Box display="flex" justifyContent="space-between" alignItems="baseline" mt={4}>
              <Typography variant="h5" className={classes.pageHeader}>
                All Weeks
              </Typography>
              <Box display="flex" alignItems="center">
                <span className={classes.calendarIconContainer}>
                  <CalendarIcon />
                </span>
                <span>View All Weeks</span>
              </Box>
            </Box>
            <Card className={classes.card} variant="outlined">
              <Typography className={classes.sectionTitle} variant="h5">
                Completed Actions for All Weeks
              </Typography>
              <Grid
                className={classes.statsContainer}
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                spacing={1}
              >
                {Object.values(ACTION_TYPES).map(actionType => (
                  <ActionStatsCard
                    key={actionType.value}
                    actionType={actionType}
                    count={getActionCount(actionType.value)}
                  />
                ))}
              </Grid>
              <Divider className={classes.divider} />
              <Typography className={classes.sectionTitle} variant="h5">
                All Weeks
              </Typography>
              {isEmpty() && (
                <div>
                  <EmptyState />
                </div>
              )}
              {!isEmpty() && (
                <Grid container direction="row" justify="center" alignItems="flex-start">
                  {cards
                    .filter(card => isInPeriod(card.timestamp, null))
                    .map(card => (
                      <Grid key={card.props.id} item xs={12} className={classes.listItem}>
                        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                        <ActionItem {...card.props} />
                      </Grid>
                    ))}
                </Grid>
              )}
            </Card>
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

History.propTypes = HistoryPropTypes;
