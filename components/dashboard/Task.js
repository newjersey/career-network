import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
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
  isDone: {
    padding: 0,
    margin: 0,
    boxShadow: 'none',
  },
  isDoneCardChild: {
    // padding: 0,
    margin: (null, 0),
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

function bgColor(task) {
  return {
    'Marketing yourself': '#d0f0fd',
    'Relationship building': '#d2f7c5',
    'Searching/applying for jobs': '#ffeab6',
    'Researching people & companies': '#ffdce5',
  }[task.fields.Category];
}

export default function Task(props) {
  const { task, isDone, onDone, ...restProps } = props;
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

  const TaskCard = () => {
    return (
      <Card className={clsx(classes.card, isDone && classes.isDone)} data-intercom="task">
        <CardHeader
          className={clsx(isDone && classes.isDoneCardChild)}
          title={
            <Typography component="h1" variant="h3">
              <strong>{task.fields.Title}</strong>
            </Typography>
          }
        />
        <CardContent className={clsx(isDone && classes.isDoneCardChild)}>
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <div className={classes.timeEstimate} data-intercom="task-time-estimate">
            🕒{task.fields['Time Estimate']} min.
          </div>

          {task.fields.Category && (
            <Chip
              size="small"
              label={task.fields.Category}
              className={classes.type}
              style={{ backgroundColor: bgColor(task) }}
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
  };

  const CompletedTask = _props => {
    const { children } = _props;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`task-${task.id}-expansion-content`}
          id={`task-${task.id}-expansion`}
        >
          <Typography className={classes.heading}>
            <Typography component="span" color="secondary">
              ✓
            </Typography>{' '}
            {task.fields.Title}
          </Typography>
          {task.fields.Category && (
            <Chip
              size="small"
              label={task.fields.Category}
              className={classes.summaryType}
              style={{ backgroundColor: bgColor(task) }}
            />
          )}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  return isDone ? (
    <CompletedTask>
      <TaskCard />
    </CompletedTask>
  ) : (
    <TaskCard />
  );
}

Task.propTypes = {
  actions: AirtablePropTypes.actions.isRequired,
  task: AirtablePropTypes.task.isRequired,
  isDone: PropTypes.bool.isRequired,
  onDone: PropTypes.func.isRequired,
  allActionDispositionEvents: FirebasePropTypes.querySnapshot.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
};
