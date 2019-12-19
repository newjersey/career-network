import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';
import ActionList from './ActionList';
import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';

const HIGHLIGHT_COLOR = '#f9ad57';
const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3, 3, 2),
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      padding: theme.spacing(4, 4, 1),
    },
  },
  highlight: {
    border: `3px solid ${HIGHLIGHT_COLOR}`,
  },
  highlightLabel: {
    backgroundColor: HIGHLIGHT_COLOR,
    position: 'absolute',
    top: 0,
    left: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      left: theme.spacing(6),
    },
    padding: theme.spacing(1),
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    fontWeight: theme.typography.fontWeightMedium,
  },
  timeEstimate: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      top: theme.spacing(4),
      right: theme.spacing(4),
    },
  },
  type: {
    position: 'relative',
    top: -theme.spacing(2.5),
    marginBottom: theme.spacing(3.5),
  },
  summaryType: {
    position: 'absolute',
    right: theme.spacing(9),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

export default function Task(props) {
  const {
    allActionDispositionEvents,
    allTaskDispositionEvents,
    task,
    onDone,
    ...restProps
  } = props;
  const { 'Highlight Label': highlightLabel } = task.fields;
  const { userDocRef } = useAuth();
  const classes = useStyles();

  function disposition(type) {
    const data = {
      taskId: task.id,
      timestamp: new Date(),
      type,
      // below property is just for a messy denormalized log
      // (mostly to record the actions, etc. that the user actually saw,
      // in case the configuration wording should change in the future)
      task,
    };

    userDocRef.collection('taskDispositionEvents').add(data);
  }

  function onAllActionsDone() {
    onDone(task);
    disposition('done');
    window.Intercom('update', { 'last-task-completed': new Date() });
    window.Intercom('trackEvent', 'completed-task', {
      title: task.fields.Title,
      category: task.fields.Category,
      time_estimate: task.fields['Time Estimate'],
      task_id: task.id,
    });
  }

  // Returns action disposition events that ocurred after the last time this task was completed.
  // Kind of ugly, but supports the ability to complete the same task multiple times.
  function getActionDispositionEvents() {
    const lastCompleted = allTaskDispositionEvents
      .filter(event => event.data().taskId === task.id && event.data().type === 'done')
      .map(event => (event.data().timestamp ? event.data().timestamp.seconds : 0))
      .reduce((a, b) => Math.max(a, b), 0);

    return allActionDispositionEvents.filter(
      event => (event.data().timestamp ? event.data().timestamp.seconds : 0) > lastCompleted
    );
  }

  return (
    <Card className={clsx(classes.card, highlightLabel && classes.highlight)} data-intercom="task">
      {!!highlightLabel && <div className={classes.highlightLabel}>{highlightLabel}</div>}
      <CardHeader title={task.fields.Title} titleTypographyProps={{ component: 'h5' }} />
      <CardContent>
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <div className={classes.timeEstimate} data-intercom="task-time-estimate">
          🕒{task.fields['Time Estimate']} min.
        </div>

        {task.fields.Category && (
          <Chip
            size="small"
            label={task.fields.Category}
            className={classes.type}
            style={{
              backgroundColor: AirtablePropTypes.findTaskCategory(task.fields.Category).color,
            }}
          />
        )}

        <div data-intercom="task-why">
          <Typography variant="subtitle2" component="h3" gutterBottom>
            Why?
          </Typography>
          <Typography variant="body1" component="p">
            {task.fields.Why}
          </Typography>
        </div>

        <br />
        <br />

        <div data-intercom="task-how">
          <Typography variant="subtitle2" component="h3">
            How?
          </Typography>
          <ActionList
            actionDispositionEvents={getActionDispositionEvents()}
            onAllDone={onAllActionsDone}
            {...restProps}
          />
        </div>
      </CardContent>
    </Card>
  );
}

Task.propTypes = {
  actions: AirtablePropTypes.actions.isRequired,
  task: AirtablePropTypes.task.isRequired,
  onDone: PropTypes.func.isRequired,
  allTaskDispositionEvents: FirebasePropTypes.querySnapshot.isRequired,
  allActionDispositionEvents: FirebasePropTypes.querySnapshot.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
};
