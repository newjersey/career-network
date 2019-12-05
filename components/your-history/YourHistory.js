import { makeStyles } from '@material-ui/styles';
import { format } from 'date-fns';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../ScaffoldContainer';
import YourHistoryPropTypes from './PropTypes';

import ActivityCard from './ActivityCard';

function getFormattedDateCompleted(timestamp) {
  const date = timestamp.toDate();
  return format(date, 'MMMM do');
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),
  },
  subtitle: {
    marginTop: theme.spacing(10),
  },
  listItem: {
    marginTop: theme.spacing(2),
  },
}));

export default function YourHistory(props) {
  const classes = useStyles();
  const [visibleActivities, setVisibleActivities] = useState([]);
  const { activities } = props;

  useEffect(() => {
    if (!activities.empty) {
      const temp = activities.map(a => a.data());
      setVisibleActivities(temp);
    }
  }, [activities]);

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container direction="row" justify="space-between" alignItems="flex-start">
          <Typography>Your Hiistory</Typography>
          <Grid xs={12} direction="row" justify="center">
            {visibleActivities.map(activity => (
              <Grid item className={classes.listItem}>
                <ActivityCard
                  key={activity.timestamp}
                  {...activity}
                  dateCompleted={getFormattedDateCompleted(activity.dateCompleted)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

YourHistory.propTypes = YourHistoryPropTypes;
