import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { format, compareDesc, isSameMonth, isSameYear } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import CalendarIcon from '@material-ui/icons/CalendarTodayRounded';
import Grid from '@material-ui/core/Grid';
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
  const isInMonthYear = (date, monthYear) =>
    isSameMonth(date, monthYear) && isSameYear(date, monthYear);
  const classes = useStyles();
  const { activities, completedTasks } = props;
  let activityMonths = [];
  let cards = [];

  const activitiesTemp = activities.map(a => {
    const { dateCompleted, ...activity } = a.data();
    return {
      ...activity,
      dateCompleted,
      dateCmp: dateCompleted.toDate(),
      cardType: 'ACTIVITY',
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
      cardType: 'TASK',
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

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography variant="h5" component="h5" className={classes.pageHeader}>
          Your Activities
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
                .map(card => (
                  <Grid key={card.timestamp} item xs={12} className={classes.listItem}>
                    {card.cardType === 'ACTIVITY' ? (
                      <Activity {...card} />
                    ) : (
                      <CompletedTask {...card} />
                    )}
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
