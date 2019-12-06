import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ActivityPropTypes } from './PropTypes';

function getFormattedDateCompleted(timestamp) {
  const date = timestamp.toDate();
  return format(date, 'MMMM do');
}
function getFormattedDateEntered(timestamp) {
  const date = timestamp.toDate();
  return format(date, 'P');
}

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    padding: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  group: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  label: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  description: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

function ActivityCard(props) {
  const classes = useStyles();

  const {
    timestamp,
    activityType,
    description,
    briefDescription,
    dateCompleted,
    timeSpentInMinutes,
    difficultyLevel,
    activityFeeling,
    whyIfeelThisWay,
  } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.header}>
          <Typography variant="body1" noWrap style={{ maxWidth: '50%', fontWeight: 500 }}>
            {activityType}
          </Typography>
          <Typography variant="caption" component="p" noWrap>
            {getFormattedDateEntered(timestamp)}
          </Typography>
        </div>

        <Typography variant="h6" component="h2" className={classes.group}>
          {briefDescription}
        </Typography>
        <Typography variant="body2" component="p" className={classes.description}>
          {description}
        </Typography>
        <Grid container className={classes.group}>
          <Grid item xs={4}>
            <Typography variant="body2" className={classes.label}>
              Completed On
            </Typography>
            <Typography variant="body1">{getFormattedDateCompleted(dateCompleted)}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" className={classes.label}>
              Difficulty
            </Typography>
            <Typography variant="body1">{difficultyLevel}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" className={classes.label}>
              Estimated Time
            </Typography>
            <Typography variant="body1" component="span" display="block">
              {timeSpentInMinutes} Minutes
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <div className={classes.group}>
          <Typography variant="body2" className={classes.label} gutterBottom>
            I felt...
          </Typography>
          <Grid>
            {activityFeeling.map(feeling => (
              <Chip key={feeling} label={feeling} className={classes.chip} />
            ))}
          </Grid>
        </div>
        <div className={classes.group}>
          <Typography variant="body2" className={classes.label} gutterBottom>
            I felt like this because...
          </Typography>
          <Typography variant="body2" component="p">
            {whyIfeelThisWay}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

ActivityCard.propTypes = ActivityPropTypes;

ActivityCard.defaultProps = {
  activityType: '',
  dateCompleted: null,
  timeSpentInMinutes: null,
  difficultyLevel: '',
  activityFeeling: [],
  whyIfeelThisWay: '',
  briefDescription: '',
  timestamp: null,
};

export default ActivityCard;
