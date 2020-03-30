import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'fixed',
    zIndex: '100',
    top: 'auto',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    maxWidth: theme.spacing(50),
    borderColor: theme.palette.primary.main,
    borderWidth: 'medium',
  },
}));

export default function NotificationCard() {
  const classes = useStyles();
  const { user, userDocRef } = useAuth();
  const showSurvey = user.isCovidSurveyShown == null || !user.isCovidSurveyShown;

  const onClose = () => {
    userDocRef.set({ isCovidSurveyShown: true }, { merge: true });
  };

  return (
    showSurvey && (
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            COVID-19 Unemployment Questions and Concerns
          </Typography>
          <Typography variant="body2" gutterBottom>
            We are working with the NJ Department of Labor to gather any questions or concerns you
            have about job loss, unemployment insurance, sick leave, and benefits or resources that
            may be available to help during the current COVID-19 pandemic.
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button style={{ color: 'grey' }} onClick={onClose}>
            <strong>DISMISS</strong>
          </Button>
          <Button
            href="https://docs.google.com/forms/d/e/1FAIpQLSe4MFQSdibVxbF6m3LYardieuCtt2kFoOB_tGfe2hwmyFmRxg/viewform"
            target="_blank"
            color="primary"
            onClick={onClose}
          >
            <strong>TAKE SURVEY</strong>
          </Button>
        </CardActions>
      </Card>
    )
  );
}
