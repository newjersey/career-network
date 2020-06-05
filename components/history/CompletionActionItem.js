import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns';

import ActionIcon from '../dashboard/ActionPlan/ActionIcon';
import FirebasePropTypes from '../Firebase/PropTypes';
import {
  COMPLETION_EVENT_TYPES,
  INITIAL_ASSESSMENT_COMPLETE,
  WEEKLY_ACTION_PLAN_COMPLETE,
} from '../constants';

const useStyles = makeStyles(theme => ({
  celebrateCard: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(4),
    backgroundImage: props =>
      props.type === WEEKLY_ACTION_PLAN_COMPLETE
        ? 'url(/static/img/action-plan-history-bg.png)'
        : 'url(/static/img/assessment-complete-history-bg.png)',
    backgroundSize: 'cover',
    padding: theme.spacing(4, 6, 3, 6),
    borderColor: theme.palette.grey[300],
  },
}));

function CompletionActionItem(props) {
  const classes = useStyles(props);
  const { type, dateCompleted } = props;

  const { color, label } = COMPLETION_EVENT_TYPES[type];

  const subtitle = type === WEEKLY_ACTION_PLAN_COMPLETE ? `Weekly Action Plan Completed` : label;
  const emoji = type === WEEKLY_ACTION_PLAN_COMPLETE ? `🏆🏆` : `👍👍`;

  // The deprecated assessment complete events have the dateCompleted as a Date
  const formattedDate =
    dateCompleted instanceof Date
      ? format(dateCompleted, 'EEEE, MMM do')
      : format(dateCompleted.toDate(), 'EEEE, MMM do');

  return (
    <>
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item>
          <ActionIcon value={type} color={color} />
        </Grid>
        <Grid item>
          <Typography variant="body2">{label}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">&#183;</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            {formattedDate}
          </Typography>
        </Grid>
      </Grid>
      <Card className={classes.celebrateCard} variant="outlined">
        <Typography variant="body1" align="center">
          <span role="img" aria-label="complete-emoji" display="inline-block">
            {emoji} &nbsp;
          </span>
          {subtitle}
          <span role="img" aria-label="complete-emoji" display="inline-block">
            &nbsp; {emoji}
          </span>
        </Typography>
      </Card>
    </>
  );
}

CompletionActionItem.propTypes = {
  dateCompleted: FirebasePropTypes.timestamp.isRequired,
  type: PropTypes.oneOf([INITIAL_ASSESSMENT_COMPLETE, WEEKLY_ACTION_PLAN_COMPLETE]).isRequired,
};

CompletionActionItem.defaultProps = {};

export default CompletionActionItem;
