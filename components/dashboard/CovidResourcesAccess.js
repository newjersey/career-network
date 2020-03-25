import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FlagIcon from '@material-ui/icons/Flag';
import React from 'react';
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
    padding: theme.spacing(3, 2, 2),
  },
  cardContent: {
    padding: theme.spacing(1),
  },
  button: {
    border: `1px solid ${theme.palette.primary.light}`,
  },
}));

const handleClick = () => {
  window.Intercom('trackEvent', 'covid-access-button-clicked');
};

function CovidResourcesAccess() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.iconContainer}>
        <FlagIcon fontSize="large" />
      </div>
      <Card className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" gutterBottom>
            COVID-19 Resources
          </Typography>
          <Typography variant="body1" gutterBottom>
            If you have urgent questions here are some resources that New Jersey has made available
            for residents.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            href="https://jobs.covid19.nj.gov/"
            target="_blank"
            fullWidth
            onClick={handleClick}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default CovidResourcesAccess;
