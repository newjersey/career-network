import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import NextLink from 'next/link';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import React from 'react';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  circleIcon: {
    position: 'absolute',
    marginLeft: theme.spacing(2),
    color: theme.palette.primary.light,
    fontSize: theme.spacing(7),
    marginTop: theme.spacing(-3.3),
    backgroundColor: theme.palette.background.default,
  },
  trackIcon: {
    position: 'absolute',
    marginLeft: theme.spacing(3.3),
    marginTop: theme.spacing(-2),
    color: theme.palette.primary.light,
  },
  card: {
    padding: theme.spacing(1),
  },
  button: {
    border: `1px solid ${theme.palette.primary.light}`,
  },
}));

const handleClick = () => {
  window.Intercom('trackEvent', 'explore-button-clicked');
};

function EmploymentOutlookLauchpad() {
  const classes = useStyles();

  return (
    <>
      <RadioButtonUncheckedIcon className={classes.circleIcon} />
      <TrackChangesIcon className={classes.trackIcon} fontSize="large" />
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Employment Outlook
          </Typography>
          <Typography variant="body1" gutterBottom>
            Learn about the outlook in your area for the occupation that you want.
          </Typography>
        </CardContent>
        <CardActions>
          <NextLink href="/employment-outlook">
            <Button className={classes.button} fullWidth onClick={handleClick}>
              EXPLORE
            </Button>
          </NextLink>
        </CardActions>
      </Card>
    </>
  );
}

export default EmploymentOutlookLauchpad;
