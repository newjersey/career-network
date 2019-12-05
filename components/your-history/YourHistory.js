import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../ScaffoldContainer';
import YourHistoryPropTypes from './PropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),
  },
  subtitle: {
    marginTop: theme.spacing(10),
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
          {visibleActivities.map(activity => (
            <Typography>{activity.description}</Typography>
          ))}
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

YourHistory.propTypes = YourHistoryPropTypes;
