import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { format } from 'date-fns';

import ActionIcon from '../dashboard/ActionPlan/ActionIcon';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(4),
    borderColor: theme.palette.grey[400],
  },
  cardTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    marginTop: theme.spacing(2),
  },
  celebrateCard: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(4),
    backgroundImage: 'url(/static/img/assessment-complete-history.png)',
    backgroundSize: 'cover',
    padding: theme.spacing(4, 6, 3, 6),
  },
  openButton: {
    backgroundColor: theme.palette.grey['100'],
    color: theme.palette.background.dark,
    fontWeight: 600,
  },
}));

function ActionItem(props) {
  const classes = useStyles();
  const { title, why, dateCompleted, actionType, activityTypeValue, openDetails } = props;

  const isAssessmentCompleteAction =
    activityTypeValue && activityTypeValue === 'assessment-complete';

  const getActionLabel = () =>
    isAssessmentCompleteAction ? 'Upfront Assessment Completed' : actionType.label;

  return (
    <>
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item>
          <ActionIcon
            actionType={actionType}
            isAssessmentCompleteAction={isAssessmentCompleteAction}
          />
        </Grid>
        <Grid item>
          <Typography variant="body2">{getActionLabel()}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">&#183;</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            {format(dateCompleted.toDate(), 'EEEE, MMM do')}
          </Typography>
        </Grid>
      </Grid>
      {isAssessmentCompleteAction ? (
        <Card className={classes.celebrateCard} variant="outlined">
          <Typography variant="body1" align="center">
            <span
              role="img"
              aria-label="clap-emoji"
              display="inline-block"
              style={{ marginRight: 8 }}
            >
              👍👍
            </span>
            Upfront Assessment Completed
            <span
              role="img"
              aria-label="clap-emoji"
              display="inline-block"
              style={{ marginLeft: 8 }}
            >
              👍👍
            </span>
          </Typography>
        </Card>
      ) : (
        <Card className={classes.card} variant="outlined">
          <div className={classes.cardTitle}>
            <Typography component="h1" variant="body1">
              {title}
            </Typography>
            {openDetails && (
              <Button className={classes.openButton} variant="contained" onClick={openDetails}>
                Open
              </Button>
            )}
          </div>
          {why && (
            <Typography
              className={classes.description}
              variant="body2"
              component="p"
              color="textSecondary"
            >
              {why}
            </Typography>
          )}
        </Card>
      )}
    </>
  );
}

ActionItem.propTypes = {
  dateCompleted: FirebasePropTypes.timestamp.isRequired,
  title: PropTypes.string.isRequired,
  why: PropTypes.string,
  activityTypeValue: PropTypes.string,
  actionType: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  openDetails: PropTypes.func,
};

ActionItem.defaultProps = {
  why: null,
  activityTypeValue: null,
  openDetails: null,
};

export default ActionItem;
