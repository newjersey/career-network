import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import dayjs from 'dayjs';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import Typography from '@material-ui/core/Typography';
import upperFirst from 'lodash/fp/upperFirst';

import FirebasePropTypes from '../Firebase/PropTypes';

dayjs.extend(relativeTime);

const difficultyColor = difficulty => {
  return {
    easy: '#d2f7c5',
    medium: '#ffeab6',
    hard: '#ffdce5',
  }[difficulty.toLowerCase()];
};

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  cardHeaderTitle: {
    fontSize: '1.2rem',
  },
  cardContent: {
    paddingTop: 0,
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
}));

export default function Activity({ activity }) {
  const classes = useStyles();
  const {
    activityTypeLabel,
    dateCompleted,
    description,
    timeSpentInMinutes,
    difficultyLevel,
  } = activity.data();

  return (
    <Card className={classes.card} data-intercom="activity">
      <CardHeader
        title={upperFirst(activityTypeLabel)}
        titleTypographyProps={{ component: 'h2' }}
        subheader={dayjs(dateCompleted.toDate()).fromNow()}
        classes={{ title: classes.cardHeaderTitle }}
      />
      <CardContent className={classes.cardContent}>
        <Typography>{description}</Typography>

        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2">
              <span role="img" aria-label="Clock">
                🕒
              </span>
              {timeSpentInMinutes} min.
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="div">
              <Chip
                size="small"
                label={difficultyLevel}
                style={{ backgroundColor: difficultyColor(difficultyLevel) }}
              />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

Activity.propTypes = {
  activity: FirebasePropTypes.queryDocumentSnapshot.isRequired,
};
