import { format, compareDesc, getMonth, getYear } from 'date-fns';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CalendarIcon from '@material-ui/icons/CalendarTodayRounded';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import React, { useState, useLayoutEffect, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import uniqBy from 'lodash/fp/uniqBy';

import Activity from './Activity';
import { ACTIVITY_TYPES } from '../activityInput/constants';
import ActivityInputDialog from '../activityInput/ActivityInputDialog';
import AirtablePropTypes from '../Airtable/PropTypes';
import CompletedTask from './CompletedTask';
import EmptyState from './EmptyState';
import Filter from './Filter';
import HistoryPropTypes from './PropTypes';
import ScaffoldContainer from '../ScaffoldContainer';
import ActivityDetailDialog from './ActivityDetailDialog';

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

const unrecognizedCategoryName = AirtablePropTypes.TASK_CATEGORIES.other.name;

const getActivityCategoryName = activityTypeValue => {
  const matchingActivity = ACTIVITY_TYPES.find(
    activityType => activityType.value === activityTypeValue
  );
  return matchingActivity ? matchingActivity.category.name : unrecognizedCategoryName;
};

const isInPeriod = (date, { month, year }) => {
  return getMonth(date) === month && getYear(date) === year;
};

const DIALOGS = {
  ACTIVITY_INPUT: 'ActivityInputDialog',
  ACTIVITY_DETAIL: 'ActivityDetailDialog',
};

const INITIAL_DIALOG_CONFIG = {};
export default function History(props) {
  const classes = useStyles();
  const { activities, completedTasks } = props;
  const headerRef = useRef(null);
  const sectionHeaderRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState();
  const [activeDialog, setActiveDialog] = useState(INITIAL_DIALOG_CONFIG);

  useLayoutEffect(() => {
    setHeaderHeight(
      headerRef.current.getBoundingClientRect().height +
        sectionHeaderRef.current.getBoundingClientRect().height
    );
  }, []);

  const openActivityDetail = selectedActivity =>
    setActiveDialog({
      name: DIALOGS.ACTIVITY_DETAIL,
      activity: selectedActivity,
    });

  const openActivityInput = () => setActiveDialog({ name: DIALOGS.ACTIVITY_INPUT });

  const closeActiveDialog = () => setActiveDialog(INITIAL_DIALOG_CONFIG);

  const activitiesTemp = activities.map(a => {
    const { activityTypeValue, dateCompleted, ...activity } = a.data();
    console.log(activityTypeValue);
    return {
      ...activity,
      categoryName: getActivityCategoryName(activityTypeValue),
      dateCompleted,
      component: Activity,
      id: a.id,
      openActivityDetail: () => openActivityDetail({ dateCompleted, ...activity }),
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
    };
  });

  const cards = [...activitiesTemp, ...tasksTemp].sort((a, b) =>
    compareDesc(new Date(a.dateCmp), new Date(b.dateCmp))
  );

  const cardCategoryNames = cards
    .map(card => card.categoryName)
    .map(categoryName => AirtablePropTypes.findTaskCategory(categoryName).name);

  const [activeCategoryFilters, setActiveCategoryFilters] = useState(
    Object.fromEntries(cardCategoryNames.map(categoryName => [categoryName, true]))
  );

  const filteredCards = cards.filter(card => activeCategoryFilters[card.categoryName] === true);

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

  const onFilterChange = name => event => {
    setActiveCategoryFilters({ ...activeCategoryFilters, [name]: !!event.target.checked });
  };

  const isEmpty = () => {
    return filteredCards.length === 0;
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
      <ScaffoldContainer>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Hidden only={['xs', 'sm']}>
              <Box width={1} height={headerHeight} />
            </Hidden>
            <Card className={classes.siderail} variant="outlined">
              <Box mb={3}>
                <Typography component="h2" variant="h6">
                  Filter List By...
                </Typography>
              </Box>
              <Typography variant="h5" style={{ fontSize: 14, color: '#92929d' }} gutterBottom>
                ACTIVITY TYPE
              </Typography>
              <Filter
                filterOptions={activeCategoryFilters}
                onChange={onFilterChange}
                catchAll={unrecognizedCategoryName}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box display="flex" alignItems="baseline" width={1} ref={headerRef}>
              <Typography variant="h5" component="h5" className={classes.pageHeader}>
                All Progress
              </Typography>
            </Box>
            {isEmpty() && (
              <div>
                <Hidden only={['xs', 'sm']}>
                  <Box
                    width={1}
                    height={headerHeight - headerRef.current.getBoundingClientRect().height}
                  />
                </Hidden>
                <EmptyState />
              </div>
            )}
            {!isEmpty() &&
              activityPeriods.map(period => (
                <div key={period.formatted}>
                  {filteredCards.filter(card => isInPeriod(card.dateCompleted.toDate(), period))
                    .length > 0 && (
                    <Box display="flex" alignItems="baseline" width={1} ref={sectionHeaderRef}>
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

                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={openActivityInput}
                        data-intercom="log-activity-button"
                      >
                        +&nbsp;&nbsp;Log Activity
                      </Button>
                    </Box>
                  )}
                  <Grid container direction="row" justify="center" alignItems="flex-start">
                    {filteredCards
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
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

History.propTypes = HistoryPropTypes;
