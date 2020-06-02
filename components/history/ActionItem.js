import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import StarIcon from '@material-ui/icons/Star';

import { ACTION_TYPES } from '../dashboard/ActionPlan/constants';
import DateCompleted from '../DateCompleted';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    padding: theme.spacing(1),
  },
  group: {
    marginBottom: theme.spacing(2),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
  },
  iconContainer: {
    border: `1px solid`,
    borderRadius: '50%',
    lineHeight: 0,
    padding: theme.spacing(0.6),
    fontSize: '14px',
  },
}));

function ActionItem(props) {
  const classes = useStyles();

  const { title, why, dateCompleted, actionType } = props;

  const getIcon = () => {
    switch (actionType.value) {
      case ACTION_TYPES.goal.value:
        return <StarIcon fontSize="inherit" />;
      case ACTION_TYPES.application.value:
        return <NextWeekIcon fontSize="inherit" />;
      default:
        return <AssignmentTurnedInIcon fontSize="inherit" />;
    }
  };

  return (
    <>
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item>
          <div
            className={classes.iconContainer}
            style={{
              color: actionType.color,
              borderColor: actionType.color,
              backgroundColor: fade(actionType.color, 0.08),
            }}
          >
            {getIcon()}
          </div>
        </Grid>
        <Grid item>
          <Typography variant="body2">{actionType.label}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">&#183;</Typography>
        </Grid>
        <Grid item>
          <DateCompleted variant="body2">{dateCompleted}</DateCompleted>
        </Grid>
      </Grid>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography component="h1" variant="body1" className={classes.group}>
            {title}
          </Typography>
          {why && (
            <Typography variant="body2" component="p" color="textSecondary">
              {why}
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
}

ActionItem.propTypes = {
  dateCompleted: FirebasePropTypes.timestamp.isRequired,
  title: PropTypes.string.isRequired,
  why: PropTypes.string,
  actionType: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

ActionItem.defaultProps = {
  why: null,
};

export default ActionItem;
