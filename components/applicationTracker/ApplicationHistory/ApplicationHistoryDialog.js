import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import StatusChip from '../ApplicationStatusChip';
import { DialogTitle, DialogContent } from '../../DialogComponents';
import HistoryItem from './HistoryItem';

const useStyles = makeStyles(theme => ({
  /* Styles applied to the root element. */
  stepsContainer: {
    display: 'flex',
    padding: 24,
    flexDirection: 'column',
  },
  dialogTitle: {
    padding: theme.spacing(4, 4, 1, 4),
  },
  title: {
    fontSize: theme.typography.pxToRem(24),
  },
}));

function ApplicationHistoryDialog({ open, application, handleClose }) {
  const classes = useStyles();

  const onClose = () => handleClose();

  return (
    <Dialog open={open} aria-labelledby="application-history-dialog" maxWidth="sm" fullWidth>
      <DialogTitle
        id="application-history-dialog"
        onClose={onClose}
        className={classes.dialogTitle}
      >
        <StatusChip status={application.currentStatus} />
        <Box my={2} color={application.isActive ? 'text.primary' : 'text.light'}>
          <Typography variant="h4" className={classes.title} color="inherit">
            {application.jobTitle}
          </Typography>
          <Typography variant="body2" color="inherit">
            at {application.company}
          </Typography>
        </Box>
        <Divider />
      </DialogTitle>
      <div className={classes.stepsContainer}>
        {application.statusEntries.map((entry, index) => (
          <HistoryItem
            key={entry.id}
            {...entry}
            index={index}
            showInactive={!application.isActive && index + 1 === application.statusEntries.length}
            isLast={index + 1 === application.statusEntries.length}
          />
        ))}
      </div>
      <DialogContent />
    </Dialog>
  );
}

ApplicationHistoryDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  application: PropTypes.shape({
    jobTitle: PropTypes.string,
    company: PropTypes.string,
    statusEntries: PropTypes.arrayOf(PropTypes.object),
    currentStatusEntryId: PropTypes.number,
    currentStatus: PropTypes.string,
    isActive: PropTypes.bool,
  }),
};

ApplicationHistoryDialog.defaultProps = {
  application: {
    jobTitle: '',
    company: '',
    statusEntries: [],
    isActive: true,
  },
};

export default ApplicationHistoryDialog;
