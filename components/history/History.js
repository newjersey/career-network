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

import Activity from './Activity';
import ActivityInputDialog, { ACTIVITY_TYPES } from '../activityInput/ActivityInputDialog';
import ActionStatsCard from './ActionStatsCard';
import AirtablePropTypes from '../Airtable/PropTypes';
import BackgroundHeader from '../BackgroundHeader';
import CompletedTask from './CompletedTask';
import EmptyState from './EmptyState';
import HistoryPropTypes from './PropTypes';
import ScaffoldContainer from '../ScaffoldContainer';
import { ACTION_TYPES } from '../dashboard/ActionPlan/constants';
import ActionItem from './ActionItem';

const useStyles = makeStyles(theme => ({
  backgroundHeader: {
    background: `linear-gradient(to right, #ffffff, #60b1e9 100%)`,
  },
  pageHeader: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    fontWeight: theme.typography.fontWeightMedium,
  },
  listItem: {
    marginBottom: theme.spacing(2),
  },
  sectionHeader: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },
  calendarIconContainer: {
    marginRight: theme.spacing(1),
  },
  siderail: {
    padding: theme.spacing(4),
  },
  card: {
    padding: theme.spacing(3),
  },
  statsContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
}));

const getActivityCategoryName = activityTypeValue =>
  ACTIVITY_TYPES.find(activityType => activityType.value === activityTypeValue).category.name;

const isInPeriod = (date, period) => {
  return !period || (getMonth(date) === period.month && getYear(date) === period.year);
};

const unrecognizedCategoryName = AirtablePropTypes.TASK_CATEGORIES.other.name;

export default function History(props) {
  const classes = useStyles();
  const { activities, completedTasks } = props;
  const [showDialog, setShowDialog] = useState(false);

  const activitiesTemp = activities.map(a => {
    const { activityTypeValue, dateCompleted, ...activity } = a.data();
    return {
      ...activity,
      categoryName: getActivityCategoryName(activityTypeValue) || unrecognizedCategoryName,
      dateCompleted,
      component: Activity,
      id: a.id,
      title: activity.briefDescription,
      actionType: ACTION_TYPES.activity,
    };
  });

  const tasksTemp = completedTasks.map(taskEvent => {
    const { task, timestamp } = taskEvent.data();
    return {
      ...task,
      categoryName: task.fields.Category || unrecognizedCategoryName,
      title: task.fields.Task,
      why: task.fields.Why,
      dateCompleted: timestamp,
      timestamp,
      component: CompletedTask,
      id: taskEvent.id,
      actionType: ACTION_TYPES.goal,
    };
  });

  const cards = [...activitiesTemp, ...tasksTemp].sort((a, b) =>
    compareDesc(new Date(a.dateCmp), new Date(b.dateCmp))
  );

  // const activityPeriods = uniqBy('formatted')(
  //   cards.map(card => {
  //     const date = card.dateCompleted.toDate();
  //     return {
  //       month: getMonth(date),
  //       year: getYear(date),
  //       formatted: format(date, 'MMMM y'),
  //     };
  //   })
  // );

  const isEmpty = () => {
    return cards.length === 0;
  };

  const getActionCount = actionTypeValue => {
    switch (actionTypeValue) {
      case ACTION_TYPES.goal.value:
        return completedTasks.length;
      case ACTION_TYPES.activity.value:
        return activities.length;
      default:
        return 0;
    }
  };

  return (
    <div className={classes.root}>
      <ActivityInputDialog show={showDialog} onClose={() => setShowDialog()} />
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
              onClick={() => setShowDialog(true)}
              data-intercom="log-activity-button"
            >
              +&nbsp;&nbsp;Log Activity
            </Button>
          </Grid>
        </ScaffoldContainer>
      </BackgroundHeader>
      <ScaffoldContainer>
        <Grid container justify="center">
          <Grid item xs={12} md={9}>
            <Box display="flex" justifyContent="space-between" alignItems="baseline">
              <Typography variant="h5" component="h5" className={classes.pageHeader}>
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
              <Typography>Completed Actions for All Weeks</Typography>
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
                    actionType={actionType}
                    count={getActionCount(actionType.value)}
                  />
                ))}
              </Grid>
              <Divider />
              {isEmpty() && (
                <div>
                  <EmptyState />
                </div>
              )}
              {!isEmpty() && (
                <Grid container direction="row" justify="center" alignItems="flex-start">
                  {cards
                    .filter(card => isInPeriod(card.dateCompleted.toDate(), null))
                    .map(card => (
                      <Grid key={card.id} item xs={12} className={classes.listItem}>
                        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                        <ActionItem {...card} />
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
