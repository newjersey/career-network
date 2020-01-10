import React, { useState, useLayoutEffect, useRef } from 'react';
import { format, compareDesc, isSameMonth, isSameYear } from 'date-fns';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import CalendarIcon from '@material-ui/icons/CalendarTodayRounded';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import { ACTIVITY_TYPES } from '../dashboard/ActivityInputDialog';
import Activity from './Activity';
import AirtablePropTypes from '../Airtable/PropTypes';
import CompletedTask from './CompletedTask';
import EmptyState from './EmptyState';
import Filter from './Filter';
import HistoryPropTypes from './PropTypes';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),
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

export default function History(props) {
  const isInMonthYear = (date, monthYear) =>
    isSameMonth(date, monthYear) && isSameYear(date, monthYear);
  const classes = useStyles();
  const { activities, completedTasks } = props;
  const headerRef = useRef(null);
  const sectionHeaderRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState();
  let activityMonths = [];
  let cards = [];

  useLayoutEffect(() => {
    setHeaderHeight(
      headerRef.current.getBoundingClientRect().height +
        sectionHeaderRef.current.getBoundingClientRect().height
    );
  }, []);

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

  const isEmpty = () => {
    return cards.filter(card => activeCategoryFilters[card.categoryName] === true).length === 0;
  };

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Hidden only="xs">
              <Box width={1} height={headerHeight} />
            </Hidden>
            {!isEmpty() && (
              <Card className={classes.siderail} variant="outlined">
                <Box mb={3}>
                  <Typography component="h2" variant="h6">
                    Filter List By...
                  </Typography>
                </Box>
                <Typography variant="h5" style={{ fontSize: 14, color: '#92929d' }} gutterBottom>
                  ACTIVITY TYPE
                </Typography>
                <Filter filterOptions={activeCategoryFilters} onChange={onChange} />
              </Card>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="baseline" width={1} ref={headerRef}>
              <Typography variant="h5" component="h5" className={classes.pageHeader}>
                All Progress
              </Typography>
            </Box>
            {isEmpty() && (
              <Box mt={11}>
                <EmptyState />
              </Box>
            )}
            {!isEmpty() &&
              activityMonths.map(dateString => (
                <div key={dateString}>
                  {cards.filter(
                    card =>
                      isInMonthYear(card.dateCmp, new Date(dateString)) &&
                      activeCategoryFilters[card.categoryName] === true
                  ).length > 0 && (
                    <Box display="flex" alignItems="baseline" width={1} ref={sectionHeaderRef}>
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
                    </Box>
                  )}
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
