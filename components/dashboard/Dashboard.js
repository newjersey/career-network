import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';
import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import ScaffoldContainer from '../ScaffoldContainer';
import TaskList from './TaskList';
import TimeDistanceParser from '../../src/time-distance-parser';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),
  },
  subtitle: {
    marginBottom: theme.spacing(5),
  },
}));

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function Dashboard(props) {
  const classes = useStyles();
  const { user } = useAuth();
  const {
    allConditions,
    allPredicates,
    allTasks,
    allQuestionResponses,
    allActions,
    allActionDispositionEvents,
    ...restProps
  } = props;

  // function hasNonDispositionedActions(task) {
  //   return debugMode ? true : !!getNonDispositionedActions(task).length;
  // }

  // take the top four (arbitrary, looks good in columns)
  // const showMax = debugMode ? 99999 : 4;
  // const tasks = allTasks
  //   .filter(task => isIndicated(task))
  //   .filter(task => hasNonDispositionedActions(task))
  //   .slice(0, showMax);

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container direction="row" justify="space-between" alignItems="flex-start">
          <Grid item>
            <Typography component="h1" variant="h2" gutterBottom>
              Hi, {user && user.firstName}!
            </Typography>
            <Typography variant="subtitle1" gutterBottom className={classes.subtitle}>
              Ready to take the next step in your career? The steps below have been planned just for
              you; get started today!
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">{`Showing all ${allTasks.length}`} tasks</Typography>
          </Grid>
        </Grid>
        <TaskList
          tasks={allTasks}
          allActions={allActions}
          allActionDispositionEvents={allActionDispositionEvents}
          debugMode
          {...restProps}
        />
      </ScaffoldContainer>
    </div>
  );
}

Dashboard.propTypes = {
  allActions: AirtablePropTypes.actions.isRequired,
  allConditions: AirtablePropTypes.conditions.isRequired,
  allPredicates: AirtablePropTypes.predicates.isRequired,
  allTasks: AirtablePropTypes.tasks.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
  allActionDispositionEvents: FirebasePropTypes.querySnapshot.isRequired,
};
