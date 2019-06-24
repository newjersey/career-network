import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';
import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import ScaffoldContainer from '../ScaffoldContainer';
import TheoryList from './TheoryList';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const { user } = useAuth();
  const { allTheories, ...restProps } = props;

  const theories = allTheories;

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography component="h1" variant="h2" gutterBottom>
          Hi,
          {' '}
          {user && user.firstName}
          !
        </Typography>

        <Typography component="h2" variant="h4" gutterBottom>
          Task List
        </Typography>
        <TheoryList theories={theories} {...restProps} />
      </ScaffoldContainer>
    </div>
  );
}

Dashboard.propTypes = {
  allActions: AirtablePropTypes.actions.isRequired,
  allConditions: AirtablePropTypes.conditions.isRequired,
  allPredicates: AirtablePropTypes.predicates.isRequired,
  allResources: AirtablePropTypes.resources.isRequired,
  allTheories: AirtablePropTypes.theories.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
};
