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

function getFormattedDateCompleted(timestamp) {
  const date = timestamp.toDate();
  return format(date, 'MMMM do');
}

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

function filterDoneFromTaskDispositionEvents(events) {
  // Remove duplicates and prefer most recent task timestamp
  const taskIds = events.reduce(
    (unique, item) =>
      unique.includes(item.data().taskId) ? unique : [...unique, item.data().taskId],
    []
  );
  return taskIds
    .map(
      tId =>
        events
          .filter(event => event.data().taskId === tId)
          .sort((a, b) => b.data().timestamp.seconds - a.data().timestamp.seconds)[0]
    )
    .map(taskEvent => {
      if (taskEvent.data().type === 'done') {
        const { task, timestamp } = taskEvent.data();
        return {
          dateCmp: timestamp.toDate(),
          categoryName: task.fields.Category,
          title: task.fields.Task,
          why: task.fields.Why,
          dateCompleted: getFormattedDateCompleted(timestamp),
          timestamp,
          cardType: 'task',
        };
      }
      return null;
    });
}

export default function History(props) {
  const isInMonthYear = (date, monthYear) =>
    isSameMonth(date, monthYear) && isSameYear(date, monthYear);
  const classes = useStyles();
  const { activities, taskDispositionEvents } = props;
  let activityMonths = [];
  let completedTasks = [];
  let cards = [];
  const dates = [];

  if (!taskDispositionEvents.empty) {
    completedTasks = filterDoneFromTaskDispositionEvents(taskDispositionEvents);
  }
  if (!activities.empty) {
    const temp = activities.map(a => {
      const { dateCompleted, ...activity } = a.data();
      return {
        ...activity,
        dateCompleted: getFormattedDateCompleted(dateCompleted),
        dateCmp: dateCompleted.toDate(),
        cardType: 'activity',
      };
    });

    activityMonths = dates.sort((a, b) => compareDesc(new Date(a), new Date(b)));
    cards = [...temp, ...completedTasks].sort((a, b) =>
      compareDesc(new Date(a.dateCmp), new Date(b.dateCmp))
    );
  }

  cards.forEach(c => {
    const date = format(c.dateCmp, 'MMMM y');
    if (!dates.includes(date)) {
      dates.push(date);
    }
  });
  activityMonths = dates.sort((a, b) => compareDesc(new Date(a), new Date(b)));

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography variant="h5" component="h5" className={classes.pageHeader}>
          Your Activities
        </Typography>
        {activityMonths.map(dateString => (
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
              {cards
                .filter(card => isInMonthYear(card.dateCmp, new Date(dateString)))
                .map(card => (
                  <Grid key={card.timestamp} item xs={12} className={classes.listItem}>
                    {card.cardType === 'activity' ? (
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
