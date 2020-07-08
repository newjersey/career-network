import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import NextLink from 'next/link';

import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
  },
  cardHeader: {
    marginBottom: theme.spacing(1),
  },
  cardContent: {
    padding: theme.spacing(1),
  },
  countContent: {
    fontWeight: 'bold',
    display: 'inline',
  },
  lightButtonRoot: {
    backgroundColor: 'RGBA(24,129,197,0.06)',
  },
  lightButtonLabel: {
    color: '#1881C5',
  },
}));

function ApplicationTrackerCard({ applications }) {
  const classes = useStyles();
  const activeApplications = applications.filter(item => item && item.data().isActive);
  const activeApplicationsCount = activeApplications.length;

  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            Application Tracker
          </Typography>
          <Typography variant="body1" gutterBottom>
            See the status of all of your job applications in one spot. You are currently tracking{' '}
            <div className={classes.countContent}>
              {activeApplicationsCount} Active Application(s)
            </div>
            . Keep tracking here.
          </Typography>
        </CardContent>
        <CardActions>
          <NextLink href="/application-tracker">
            <Button
              fullWidth
              variant="contained"
              size="large"
              classes={{ root: classes.lightButtonRoot, label: classes.lightButtonLabel }}
            >
              View My Applications
            </Button>
          </NextLink>
        </CardActions>
      </Card>
    </>
  );
}

ApplicationTrackerCard.propTypes = {
  applications: FirebasePropTypes.querySnapshot.isRequired,
};

export default ApplicationTrackerCard;
