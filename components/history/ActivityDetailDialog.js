import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import formatDate from 'date-fns/format';
import { DialogTitle, DialogContent } from '../DialogComponents';
import { TIME_SPENT_OPTIONS } from '../activityInput/constants';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  infoGroup: {
    margin: theme.spacing(2, 0),
  },
  dialogSubtitle: {
    margin: theme.spacing(0, 0, 2),
  },
}));

function ActivityDetailDialog({ show, activity, onClose }) {
  const classes = useStyles();
  const {
    activityTypeLabel,
    briefDescription,
    dateCompleted,
    timeSpentInMinutes,
    difficultyLevel,
    activityFeeling,
    description,
  } = activity;

  const formattedDate = dateCompleted ? formatDate(dateCompleted.toDate(), 'EEEE, MMMM do') : '';
  const timeSpentString = timeSpentInMinutes
    ? TIME_SPENT_OPTIONS.find(timeOption => timeOption.value === timeSpentInMinutes).label
    : '';
  return (
    <div>
      <Dialog open={show} aria-labelledby="activity-detail-dialog">
        <DialogTitle id="activity-detail-dialog" onClose={onClose} />
        <DialogContent>
          <div className={classes.dialogSubtitle}>
            <Typography variant="caption" display="inline">
              Activity Logged •{' '}
            </Typography>
            <Typography variant="caption" display="inline">
              {formattedDate}
            </Typography>
          </div>
          <Typography variant="h4" color="primary" gutterBottom>
            {briefDescription}
          </Typography>
          <Typography variant="body2">{description}</Typography>
          <Divider className={classes.infoGroup} />
          <div className={classes.infoGroup}>
            <Typography variant="caption" color="textSecondary">
              Activity Type
            </Typography>
            <Typography variant="body2">{activityTypeLabel}</Typography>
          </div>
          <div className={classes.infoGroup}>
            <Typography variant="caption" color="textSecondary">
              Difficulty Level
            </Typography>
            <Typography variant="body2">{difficultyLevel}</Typography>
          </div>
          <div className={classes.infoGroup}>
            <Typography variant="caption" color="textSecondary">
              Time Spent
            </Typography>
            <Typography variant="body2">{timeSpentString}</Typography>
          </div>
          <div className={classes.infoGroup}>
            <Typography variant="caption" color="textSecondary">
              I Felt...
            </Typography>
            <Typography variant="body2">{activityFeeling.join(' and ')}</Typography>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

ActivityDetailDialog.propTypes = {
  activity: PropTypes.shape({
    activityTypeLabel: PropTypes.string,
    briefDescription: PropTypes.string,
    description: PropTypes.string,
    dateCompleted: FirebasePropTypes.timestamp,
    timeSpentInMinutes: PropTypes.number,
    difficultyLevel: PropTypes.string,
    activityFeeling: PropTypes.arrayOf(PropTypes.string),
  }),
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

ActivityDetailDialog.defaultProps = {
  activity: {
    activityFeeling: [],
  },
};

export default ActivityDetailDialog;
