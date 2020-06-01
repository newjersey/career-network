import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { ACTION_COLORS, ACTION_TYPES } from './ActionPlan/constants';
import DateCompleted from '../DateCompleted';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  cardTitle: {
    fontSize: '1rem',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  iconContainer: {
    border: `1px solid`,
    borderRadius: '50%',
    lineHeight: 0,
    padding: theme.spacing(0.5),
    fontSize: '12px',
  },
}));

export default function ProgressFeedItem(props) {
  const classes = useStyles();
  const { title, date, actionType } = props;

  const getIcon = () => {
    switch (actionType.value) {
      case ACTION_TYPES.goal.value:
        return <VpnKeyIcon fontSize="inherit" />;
      case ACTION_TYPES.application.value:
        return <NextWeekIcon fontSize="inherit" />;
      default:
        return <AssignmentTurnedInIcon fontSize="inherit" />;
    }
  };

  return (
    <>
      <Card className={classes.card} data-intercom="progress-feed-item">
        <Divider className={classes.divider} />
        <CardContent className={classes.cardContent}>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <div
                className={classes.iconContainer}
                style={{
                  color: ACTION_COLORS[actionType.value],
                  borderColor: ACTION_COLORS[actionType.value],
                }}
              >
                {getIcon()}
              </div>
            </Grid>
            <Grid item>
              <Typography variant="body2">{actionType.label}</Typography>
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
    </>
  );
}

ProgressFeedItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: FirebasePropTypes.timestamp.isRequired,
  actionType: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

ProgressFeedItem.defaultProps = {};
