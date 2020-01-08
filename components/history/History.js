import React, { useState } from 'react';
import { format, compareDesc, isSameMonth, isSameYear } from 'date-fns';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import CalendarIcon from '@material-ui/icons/CalendarTodayRounded';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { ACTIVITY_TYPES } from '../dashboard/ActivityInputDialog';
import Activity from './Activity';
import AirtablePropTypes from '../Airtable/PropTypes';
import CompletedTask from './CompletedTask';
import Filter from './Filter';
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
  paper: {
    padding: theme.spacing(5, 4, 3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 5, 4),
    },
  },
}));

export default function History(props) {
  const isInMonthYear = (date, monthYear) =>
    isSameMonth(date, monthYear) && isSameYear(date, monthYear);
  const classes = useStyles();
  const { activities, completedTasks } = props;
  let activityMonths = [];
  let cards = [];

  const allCategoryFilters = Object.values(AirtablePropTypes.TASK_CATEGORIES).map(
    category => category.name
  );
  const [activeCategoryFilters, setActiveCategoryFilters] = useState(
    Object.fromEntries(allCategoryFilters.map(filterName => [filterName, true]))
  );

  const getActivityCategoryName = activityTypeValue =>
    ACTIVITY_TYPES.find(activityType => activityType.value === activityTypeValue).category.name;

  const activitiesTemp = activities.map(a => {
    const { activityTypeValue, dateCompleted, ...activity } = a.data();
    return {
      ...activity,
      categoryName: getActivityCategoryName(activityTypeValue),
      dateCompleted,
      dateCmp: dateCompleted.toDate(),
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
      dateCmp: timestamp.toDate(),
      timestamp,
      component: CompletedTask,
      id: taskEvent.id,
    };
  });

  cards = [...activitiesTemp, ...tasksTemp].sort((a, b) =>
    compareDesc(new Date(a.dateCmp), new Date(b.dateCmp))
  );
  activityMonths = cards
    .map(c => c.dateCmp)
    .reduce((datesArr, current) => {
      const date = format(current, 'MMMM y');
      return !datesArr.includes(date) ? [...datesArr, date] : datesArr;
    }, []);

  const onChange = name => event => {
    setActiveCategoryFilters({ ...activeCategoryFilters, [name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box mt={20}>
              <Paper className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                  Filter List By...
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  ACTIVITY TYPE
                </Typography>
                <Filter filterOptions={activeCategoryFilters} onChange={onChange} />
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h5" className={classes.pageHeader}>
              All Progress
            </Typography>
            {activityMonths.map(dateString => (
              <div key={dateString}>
                <div className={classes.sectionHeader}>
                  <CalendarIcon className={classes.calendarIcon} fontSize="small" />
                  <Typography
                    variant="subtitle2"
                    display="inline"
                    style={{ textTransform: 'uppercase' }}
                  >
                    {dateString}
                  </Typography>
                </div>
                <Grid container direction="row" justify="center" alignItems="flex-start">
                  {cards
                    .filter(card => isInMonthYear(card.dateCmp, new Date(dateString)))
                    .filter(card => activeCategoryFilters[card.categoryName] === true)
                    .map(card => (
                      <Grid key={card.id} item xs={12} className={classes.listItem}>
                        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                        <card.component {...card} />
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
