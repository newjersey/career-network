import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import ActionIcon from './ActionPlan/ActionIcon';

import DateCompleted from '../DateCompleted';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  cardTitle: {
    fontSize: '1rem',
    marginLeft: theme.spacing(4),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  iconContainer: {
    border: `1px solid`,
    borderRadius: '50%',
    lineHeight: 0,
    padding: theme.spacing(0.6),
    fontSize: '14px',
  },
}));

export default function ProgressFeedItem(props) {
  const classes = useStyles();
  const { title, date, value, color, label } = props;

  // const getIcon = () => {
  //  switch (value) {
  //    case ACTION_TYPES.goal.value:
  //      return <StarIcon fontSize="inherit" />;
  //    case ACTION_TYPES.application.value:
  //      return <NextWeekIcon fontSize="inherit" />;
  //    case WEEKLY_ACTION_PLAN_COMPLETE:
  //      return <ActionPlan fontSize="inherit" />;
  //    case INITIAL_ASSESSMENT_COMPLETE:

  //    default:
  //      return <AssignmentTurnedInIcon fontSize="inherit" />;
  //  }
  // };

  return (
    <Card className={classes.card} data-intercom="progress-feed-item">
      <Divider className={classes.divider} />
      <CardContent className={classes.cardContent}>
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            <ActionIcon iconClassName={classes.iconContainer} value={value} color={color} />
          </Grid>
          <Grid item>
            <Typography variant="body2">{label}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">&#183;</Typography>
          </Grid>
          <Grid item>
            <DateCompleted variant="body2">{date}</DateCompleted>
          </Grid>
        </Grid>
        <Typography variant="h6" component="h2" className={classes.cardTitle}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

ProgressFeedItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: FirebasePropTypes.timestamp.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
