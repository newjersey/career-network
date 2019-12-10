import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { format, compareDesc, isSameMonth, isSameYear } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import CalendarIcon from '@material-ui/icons/CalendarTodayRounded';
import Grid from '@material-ui/core/Grid';
import Activity from './Activity';
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
  const classes = useStyles();
  const { activities } = props;
  let visibleActivities = [];
  let activityMonths = [];

  const isInMonthYear = (date, monthYear) =>
    isSameMonth(date, monthYear) && isSameYear(date, monthYear);

  if (!activities.empty) {
    const dates = [];
    const temp = activities
      .map(a => {
        const activity = a.data();
        const date = format(activity.dateCompleted.toDate(), 'MMMM y');
        if (!dates.includes(date)) {
          dates.push(date);
        }
        return activity;
      })
      .sort((activityA, activityB) =>
        compareDesc(
          new Date(activityA.dateCompleted.toDate()),
          new Date(activityB.dateCompleted.toDate())
        )
      );
    visibleActivities = temp;
    activityMonths = dates;
  }

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography variant="h5" component="h5" className={classes.pageHeader}>
          Your Activities
        </Typography>
        {activityMonths
          .sort((a, b) => compareDesc(new Date(a), new Date(b)))
          .map(dateString => (
            <div className={classes.section} key={dateString}>
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
                {visibleActivities
                  .filter(activity =>
                    isInMonthYear(activity.dateCompleted.toDate(), new Date(dateString))
                  )
                  .map(activity => (
                    <Grid item xs={12} className={classes.listItem} key={activity.timestamp}>
                      <Activity {...activity} />
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
