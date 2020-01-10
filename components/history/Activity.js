import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import DateCompleted from '../DateCompleted';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    padding: theme.spacing(2, 2, 0),
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
    fontSize: 13,
    color: 'textSecondary',
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
          <Typography variant="body2" noWrap style={{ maxWidth: '75%' }}>
            {activityTypeLabel}
          </Typography>
        </div>

        <Typography component="h1" variant="h5" display="block" className={classes.group}>
          {briefDescription}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          color="textSecondary"
          className={classes.description}
        >
          {description}
        </Typography>
        <Divider className={classes.divider} />
        <Grid container className={classes.group}>
          <Grid item xs={4}>
            <Typography variant="body2" className={classes.label}>
              Date Completed
            </Typography>
            <DateCompleted variant="body1" style={{ fontWeight: 500 }}>
              {dateCompleted}
            </DateCompleted>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" className={classes.label}>
              Difficulty Level
            </Typography>
            <Typography variant="body1" style={{ fontWeight: 500 }}>
              {difficultyLevel}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" className={classes.label}>
              Time Spent
            </Typography>
            <Typography
              variant="body1"
              component="span"
              display="block"
              style={{ fontWeight: 500 }}
            >
              {timeSpentInMinutes} Minutes
            </Typography>
          </Grid>
        </Grid>
        {(!!activityFeeling.length || !!whyIFeelThisWay.length) && (
          <Divider className={classes.divider} />
        )}
        {!!activityFeeling.length && (
          <div className={classes.group}>
            <Typography variant="body2" className={classes.label} gutterBottom>
              I Felt...
            </Typography>
            <Grid>
              {activityFeeling.map(feeling => (
                <Chip key={feeling} label={feeling} className={classes.chip} />
              ))}
            </Grid>
          </div>
        )}
        {!!whyIFeelThisWay.length && (
          <div className={classes.group}>
            <Typography variant="body2" className={classes.label} gutterBottom>
              I Felt Like This Because...
            </Typography>
            <Typography variant="body2" component="p" color="#2c2f41">
              {whyIFeelThisWay}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

Activity.propTypes = {
  activityTypeLabel: PropTypes.string.isRequired,
  dateCompleted: FirebasePropTypes.timestamp.isRequired,
  description: PropTypes.string,
  difficultyLevel: PropTypes.string.isRequired,
  timeSpentInMinutes: PropTypes.number.isRequired,
  activityFeeling: PropTypes.arrayOf(PropTypes.string),
  whyIFeelThisWay: PropTypes.string,
  briefDescription: PropTypes.string.isRequired,
};

Activity.defaultProps = {
  activityFeeling: [],
  whyIFeelThisWay: '',
  description: '',
};

export default Activity;
