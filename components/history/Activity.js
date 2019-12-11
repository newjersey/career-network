import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import FirebasePropTypes from '../Firebase/PropTypes';

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

function Activity(props) {
  const classes = useStyles();

  const {
    timestamp,
    activityTypeLabel,
    description,
    briefDescription,
    dateCompleted,
    timeSpentInMinutes,
    difficultyLevel,
    activityFeeling,
    whyIFeelThisWay,
  } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.header}>
          <Typography variant="body1" noWrap style={{ maxWidth: '75%', fontWeight: 500 }}>
            {activityTypeLabel}
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
              Time Spent
            </Typography>
            <Typography variant="body1" component="span" display="block">
              {timeSpentInMinutes} Minutes
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        {activityFeeling.length > 0 && (
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
        )}
        {whyIFeelThisWay && whyIFeelThisWay.length > 0 && (
          <div className={classes.group}>
            <Typography variant="body2" className={classes.label} gutterBottom>
              I felt like this because...
            </Typography>
            <Typography variant="body2" component="p">
              {whyIFeelThisWay}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

Activity.propTypes = {
  activityTypeLabel: PropTypes.string,
  dateCompleted: FirebasePropTypes.timestamp,
  timestamp: FirebasePropTypes.timestamp.isRequired,
  description: PropTypes.string.isRequired,
  difficultyLevel: PropTypes.string.isRequired,
  timeSpentInMinutes: PropTypes.number.isRequired,
  activityFeeling: PropTypes.arrayOf(PropTypes.string),
  whyIFeelThisWay: PropTypes.string,
  briefDescription: PropTypes.string,
};

Activity.defaultProps = {
  activityTypeLabel: '',
  dateCompleted: null,
  activityFeeling: [],
  whyIFeelThisWay: '',
  briefDescription: '',
};

export default Activity;
