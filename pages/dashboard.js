import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth, withAuthRequired } from '../components/Auth';
import { useRecords } from '../components/Airtable';
import FullPageProgress from '../components/FullPageProgress';
import ScaffoldContainer from '../components/ScaffoldContainer';
import ActionList from '../components/dashboard/ActionList';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
  },
}));

function Dashboard() {
  const classes = useStyles();
  // const [allQuestionResponses, setAllQuestionResponses] = useState(undefined);
  const { user } = useAuth();
  const recordProps = {
    allActions: useRecords('appPhpA6Quf0pCBDm/Actions?view=API'),
    allResources: useRecords('appPhpA6Quf0pCBDm/Resources?view=API'),
  };

  const fullyLoaded = user && Object.values(recordProps)
    .map(array => array.length)
    .reduce((accum, length) => accum && !!length, true);

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        {fullyLoaded ? (
          <React.Fragment>
            <Typography component="h1" variant="h2" gutterBottom>
              Hi,
              {' '}
              {user && user.firstName}
              !
            </Typography>

            <Typography component="h2" variant="h4" gutterBottom>
              Task List
            </Typography>
            <ActionList {...recordProps} />
          </React.Fragment>
        ) : (
          <FullPageProgress />
        )}
      </ScaffoldContainer>
    </div>
  );
}

export default withAuthRequired(Dashboard);
