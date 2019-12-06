import { makeStyles } from '@material-ui/styles';
import { format, compareAsc, isSameMonth, isSameYear } from 'date-fns';
import CalendarIcon from '@material-ui/icons/CalendarTodayRounded';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import ActivityCard from './ActivityCard';
import YourHistoryPropTypes from './PropTypes';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),
  },
  pageHeader: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  listItem: {
    marginTop: theme.spacing(2),
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function YourHistory(props) {
  const classes = useStyles();
  const [visibleActivities, setVisibleActivities] = useState([]);
  const [activityMonths, setActivityMonths] = useState([]);
  const { activities } = props;

  const isInMonthYear = (date, monthYear) =>
    isSameMonth(date, monthYear) && isSameYear(date, monthYear);

  useEffect(() => {
    if (!activities.empty) {
      const dates = [];
      const temp = activities.map(a => {
        const activity = a.data();
        const date = format(activity.dateCompleted.toDate(), 'MMMM y');
        if (!dates.includes(date)) {
          dates.push(date);
        }
        return activity;
      });
      setVisibleActivities(temp);
      setActivityMonths(dates);
    }
  }, [activities]); //eslint-disable-line

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography variant="h5" component="h5" className={classes.pageHeader}>
          Your Activities
        </Typography>
        {activityMonths
          .sort((a, b) => compareAsc(new Date(a), new Date(b)))
          .map(dateString => (
            <div className={classes.section}>
              <div className={classes.sectionHeader}>
                <CalendarIcon className={classes.calendarIcon} />
                <Typography display="inline" style={{ textTransform: 'uppercase' }}>
                  {dateString}
                </Typography>
              </div>
              <Grid direction="row" justify="center" alignItems="flex-start">
                {visibleActivities
                  .filter(activity => !isInMonthYear(activity.dateCompleted, new Date(dateString)))
                  .map(activity => (
                    <Grid item xs={12} className={classes.listItem}>
                      <ActivityCard key={activity.timestamp} {...activity} />
                    </Grid>
                  ))}
              </Grid>
            </div>
          ))}
      </ScaffoldContainer>
    </div>
  );
}

YourHistory.propTypes = YourHistoryPropTypes;
