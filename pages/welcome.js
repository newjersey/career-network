import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { withAuthRequired } from '../components/Auth';
import BackgroundHeader from '../components/BackgroundHeader';
import ScaffoldContainer from '../components/ScaffoldContainer';
import withTitle from '../components/withTitle';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  backgroundHeader: {
    paddingBottom: theme.spacing(12),
  },
  assessmentContainer: {
    marginTop: theme.spacing(-11),
  },
}));

function Welcome() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BackgroundHeader className={classes.backgroundHeader}>
        <ScaffoldContainer>
          <Typography component="h1" variant="h2" gutterBottom>
            Welcome to the New Jersey Career Network!
          </Typography>
        </ScaffoldContainer>
      </BackgroundHeader>
      <ScaffoldContainer>
        <Card>
          <CardContent>Answer a few questions to set up your NJCN profile</CardContent>
        </Card>
      </ScaffoldContainer>
    </div>
  );
}

export default withAuthRequired(withTitle(Welcome, 'Welcome'));
