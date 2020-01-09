import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import NextLink from 'next/link';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    padding: theme.spacing(4, 4, 0),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  description: {
    marginBottom: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(4),
  },
}));

const EmptyState = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.header} align="center">
          <Typography variant="h5">No Activities Added</Typography>
        </div>
        <div className={classes.description} align="center">
          <Typography variant="body2" component="p">
            You have yet to add any of your activities. Once you log and complete your activities we
            will track them here to visualize your progress over time.
          </Typography>
        </div>
        <div className={classes.button} align="center">
          <NextLink href="/dashboard">
            <Button variant="contained" size="large" color="primary">
              RETURN TO DASHBOARD
            </Button>
          </NextLink>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
