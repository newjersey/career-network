import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Linkify from 'linkifyjs/react';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { useAuth } from '../Auth';
import AirtablePropTypes from '../Airtable/PropTypes';

// TODO: refactor
// eslint-disable-next-line sonarjs/cognitive-complexity
function Action(props) {
  const { userDocRef } = useAuth();
  const [open, setOpen] = React.useState(false);
  const { action, allQualityChecks, disabled, isDone, onDone, fullScreen } = props;
  const qualityChecks = allQualityChecks.filter(
    qc => action.fields['Action ID'] === qc.fields['Action ID'][0]
  );
  const defaultVerifications = new Array(qualityChecks.length);
  defaultVerifications.fill(false);
  const [verifications, setVerifications] = React.useState(defaultVerifications);
  const allVerified = verifications.reduce((a, b) => a && b, true);

  const [claimedComplete, setClaimedComplete] = React.useState(false);
  const useIndicative = claimedComplete || isDone;

  function disposition(type) {
    const data = {
      actionId: action.id,
      timestamp: new Date(),
      type,
      // below two properties are just for a messy denormalized log
      // (mostly to record the actions, etc. that the user actually saw,
      // in case the configuration wording should change in the future)
      action,
      qualityChecks,
    };

    userDocRef.collection('actionDispositionEvents').add(data);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDone() {
    handleClose();
    disposition('done');
    onDone();
  }

  function handleClaimedComplete() {
    setClaimedComplete(!claimedComplete);
  }

  function handleVerify(i, event) {
    const newVerifications = [...verifications];
    newVerifications[i] = event.target.checked;
    setVerifications(newVerifications);
  }

  return (
    <>
      <Box
        width={1}
        display="flex"
        border={1}
        borderColor="divider"
        borderRadius={3}
        justifyContent="space-between"
        alignItems="center"
        p={1}
        my={1}
        component="li"
      >
        {isDone ? (
          <CheckBoxIcon color="secondary" />
        ) : (
          <CheckBoxOutlineBlankIcon color="disabled" />
        )}
        <Box
          display="flex"
          height={1}
          justifyContent="flex-start"
          alignItems="center"
          flex={1}
          ml={1}
        >
          <Typography variant="body2" color="textSecondary">
            {action.fields.Title}
          </Typography>
        </Box>
        {isDone ? (
          <Button variant="outlined" color="secondary" size="small" onClick={handleClickOpen}>
            Done
          </Button>
        ) : (
          !disabled && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleClickOpen}
              disabled={disabled}
            >
              Start
            </Button>
          )
        )}
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{action.fields.Title}</DialogTitle>
        <DialogContent>
          <Typography>
            <Linkify
              options={{
                className:
                  'MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary',
                attributes: {
                  rel: 'noopener',
                },
              }}
            >
              {action.fields.How}
            </Linkify>
          </Typography>
          {action.fields.Screenshot &&
            action.fields.Screenshot.map(screenshot => (
              <img
                src={screenshot.thumbnails.large.url}
                alt="Screenshot"
                key={screenshot.id}
                style={{ marginTop: '1em', marginBottom: '1em', maxWidth: '100%' }}
              />
            ))}
          <br />
          <Typography>{useIndicative ? 'I verify that:' : 'Be sure to:'}</Typography>
          <ul
            style={{
              listStyle: useIndicative ? 'none' : 'initial',
              paddingLeft: useIndicative ? 0 : '40px',
            }}
          >
            {qualityChecks.map((qc, i) => (
              <Typography
                component="li"
                key={qc.id}
                style={{ minHeight: i < qualityChecks.length - 1 ? '2.75em' : 0 }}
              >
                {useIndicative && (
                  <Checkbox
                    checked={isDone || !!verifications[i]}
                    disabled={isDone}
                    onChange={event => handleVerify(i, event)}
                    color="secondary"
                    inputProps={{
                      'aria-label': 'secondary checkbox',
                    }}
                  />
                )}
                {useIndicative ? qc.fields.Indicative : qc.fields.Imperative}
              </Typography>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          {!isDone && !useIndicative && (
            <Button onClick={handleClaimedComplete} color="primary" autoFocus>
              Complete
            </Button>
          )}
          {!isDone && allVerified && (
            <Button onClick={handleDone} color="secondary" autoFocus>
              Done
            </Button>
          )}
          <Button onClick={handleClose}>{isDone ? 'OK' : 'Cancel'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Action.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  action: AirtablePropTypes.action.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
  disabled: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,
  onDone: PropTypes.func.isRequired,
};

export default withMobileDialog()(Action);
