import { format, compareDesc, getMonth, getYear } from 'date-fns';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import uniqBy from 'lodash/fp/uniqBy';

import Activity from './Activity';
import ActivityInputDialog, { ACTIVITY_TYPES } from '../activityInput/ActivityInputDialog';
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
  calendarIcon: {
    marginRight: theme.spacing(1),
  },
  siderail: {
    padding: theme.spacing(4),
  },
}));

const getActivityCategoryName = activityTypeValue =>
  ACTIVITY_TYPES.find(activityType => activityType.value === activityTypeValue).category.name;

const isInPeriod = (date, { month, year }) => {
  return getMonth(date) === month && getYear(date) === year;
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

  const activityPeriods = uniqBy('formatted')(
    cards.map(card => {
      const date = card.dateCompleted.toDate();
      return {
        month: getMonth(date),
        year: getYear(date),
        formatted: format(date, 'MMMM y'),
      };
    })
  );

  const isEmpty = () => {
    return cards.length === 0;
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
            <Box display="flex" alignItems="baseline" width={1}>
              <Typography variant="h5" component="h5" className={classes.pageHeader}>
                All Progress
              </Typography>
            </Box>
            {isEmpty() && (
              <div>
                <EmptyState />
              </div>
            )}
            {!isEmpty() &&
              activityPeriods.map(period => (
                <div key={period.formatted}>
                  {cards.filter(card => isInPeriod(card.dateCompleted.toDate(), period)).length >
                    0 && (
                    <Box display="flex" alignItems="baseline" width={1}>
                      <div className={classes.sectionHeader}>
                        <Typography
                          variant="subtitle2"
                          display="inline"
                          style={{ textTransform: 'uppercase' }}
                        >
                          {period.formatted}
                        </Typography>
                      </div>
                    </Box>
                  )}
                  <Grid container direction="row" justify="center" alignItems="flex-start">
                    {cards
                      .filter(card => isInPeriod(card.dateCompleted.toDate(), period))
                      .map(card => (
                        <Grid key={card.id} item xs={12} className={classes.listItem}>
                          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                          <ActionItem {...card} />
                        </Grid>
                      ))}
                  </Grid>
                </div>
              ))}
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

History.propTypes = HistoryPropTypes;
