import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import NextLink from 'next/link';
import React from 'react';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  iconContainer: {
    position: 'absolute',
    top: theme.spacing(-3),
    left: theme.spacing(3.3),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.light,
    border: `3px solid ${theme.palette.primary.light}`,
    borderRadius: '50%',
    lineHeight: 0,
    padding: theme.spacing(0.5),
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
      <div className={classes.iconContainer}>
        <TrackChangesIcon fontSize="large" />
      </div>
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
