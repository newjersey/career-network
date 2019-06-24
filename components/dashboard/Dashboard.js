import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';
import ActionList from './ActionList';
import AirtablePropTypes from '../Airtable/PropTypes';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const { user } = useAuth();
  // const [allQuestionResponses, setAllQuestionResponses] = useState(undefined);

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
        <ActionList {...props} />
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
};
