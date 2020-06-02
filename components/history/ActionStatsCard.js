import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import StarIcon from '@material-ui/icons/Star';

import { ACTION_TYPES } from '../dashboard/ActionPlan/constants';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
    width: '32%',
  },
  iconContainer: {
    border: `1px solid`,
    borderRadius: '50%',
    lineHeight: 0,
    padding: theme.spacing(0.6),
    fontSize: '14px',
  },
}));

function ActionStatsCard({ actionType, count }) {
  const classes = useStyles();

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
    <Card className={classes.card} variant="outlined">
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
          <Typography
            variant="body2"
            style={{
              color: actionType.color,
            }}
          >
            {count} {actionType.label}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

ActionStatsCard.propTypes = {
  actionType: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  count: PropTypes.number,
};

ActionStatsCard.defaultProps = {
  count: 0,
};

export default ActionStatsCard;
