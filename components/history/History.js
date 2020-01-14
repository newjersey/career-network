import { format, compareDesc, getMonth, getYear } from 'date-fns';
import { makeStyles } from '@material-ui/styles';
import CalendarIcon from '@material-ui/icons/CalendarTodayRounded';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import uniqBy from 'lodash/fp/uniqBy';

import Activity from './Activity';
import CompletedTask from './CompletedTask';
import HistoryPropTypes from './PropTypes';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),
  },
  pageHeader: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    fontWeight: theme.typography.fontWeightMedium,
  },
  listItem: {
    marginTop: theme.spacing(2),
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  calendarIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function History(props) {
  const isInPeriod = (date, { month, year }) => {
    return getMonth(date) === month && getYear(date) === year;
  };
  const classes = useStyles();
  const { activities, completedTasks } = props;

  const activitiesTemp = activities.map(a => {
    const { dateCompleted, ...activity } = a.data();
    return {
      ...activity,
      dateCompleted,
      component: Activity,
      id: a.id,
    };
  });

  const tasksTemp = completedTasks.map(taskEvent => {
    const { task, timestamp } = taskEvent.data();
    return {
      ...task,
      categoryName: task.fields.Category,
      title: task.fields.Task,
      why: task.fields.Why,
      dateCompleted: timestamp,
      timestamp,
      component: CompletedTask,
      id: taskEvent.id,
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

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography variant="h5" component="h5" className={classes.pageHeader}>
          All Progress
        </Typography>
        {activityPeriods.map(period => (
          <div key={period.formatted}>
            <div className={classes.sectionHeader}>
              <CalendarIcon className={classes.calendarIcon} fontSize="small" />
              <Typography
                variant="subtitle2"
                display="inline"
                style={{ textTransform: 'uppercase' }}
              >
                {period.formatted}
              </Typography>
            </div>
            <Grid container direction="row" justify="center" alignItems="flex-start">
              {cards
                .filter(card => isInPeriod(card.dateCompleted.toDate(), period))
                .map(card => (
                  <Grid key={card.id} item xs={12} className={classes.listItem}>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <card.component {...card} />
                  </Grid>
                ))}
            </Grid>
          </div>
        ))}
      </ScaffoldContainer>
    </div>
  );
}

History.propTypes = HistoryPropTypes;
