import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';
import ActionList from './ActionList';
import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3, 3, 2),
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      padding: theme.spacing(4, 4, 1),
    },
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
  const { task, onDone, ...restProps } = props;
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

  return (
    <Card className={classes.card} data-intercom="task">
      <CardHeader
        title={<strong>{task.fields.Title}</strong>}
        titleTypographyProps={{ component: 'h1', variant: 'h3' }}
      />
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
          <Typography variant="h5" component="h3" gutterBottom>
            Why?
          </Typography>
          <Typography variant="body1" component="p">
            {task.fields.Why}
          </Typography>
        </div>

        <br />
        <br />

        <div data-intercom="task-how">
          <Typography variant="h5" component="h3">
            How?
          </Typography>
          <ActionList task={task} onAllDone={onAllActionsDone} {...restProps} />
        </div>
      </CardContent>
    </Card>
  );
}

Task.propTypes = {
  actions: AirtablePropTypes.actions.isRequired,
  task: AirtablePropTypes.task.isRequired,
  onDone: PropTypes.func.isRequired,
  allActionDispositionEvents: FirebasePropTypes.querySnapshot.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
};
