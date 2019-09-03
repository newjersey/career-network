import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Linkify from 'linkifyjs/react';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import AirtablePropTypes from '../Airtable/PropTypes';

function Action(props) {
  const [open, setOpen] = React.useState(false);
  const [useIndicative, setUseIndicative] = React.useState(false);
  const [done, setDone] = React.useState(false);

  // const classes = useStyles();
  // const showMessage = useSnackbar();
  // const { userDocRef } = useAuth();
  // const [expanded, setExpanded] = React.useState(false);
  const { action, allQualityChecks, disabled, fullScreen, onDone } = props;

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDone() {
    handleClose();
    setDone(true);
    onDone();
  }

  function handleCompleted() {
    setUseIndicative(!useIndicative);
  }

  const qualityChecks = allQualityChecks.filter(
    qc => action.fields['Action ID'] === qc.fields['Action ID'][0]
  );

  const defaultVerifications = new Array(qualityChecks.length);
  defaultVerifications.fill(false);

  const [verifications, setVerifications] = React.useState(defaultVerifications);
  const allVerified = verifications.reduce((a, b) => a && b, true);

  function handleVerify(i, event) {
    const newVerifications = [...verifications];
    newVerifications[i] = event.target.checked;
    setVerifications(newVerifications);
  }

  // function handleExpandClick() {
  //   setExpanded(!expanded);
  // }

  // function disposition(type) {
  //   const data = {
  //     actionId: action.id,
  //     timestamp: new Date(),
  //     type,
  //   };

  //   userDocRef.collection('actionDispositionEvents').add(data);
  // }

  // function handleDone() {
  //   showMessage('Great job!');
  //   disposition('done');
  // }

  // function handleSnooze() {
  //   showMessage('Snoozed for one week');
  //   disposition('snoozed');
  // }

  // function handleSkip() {
  //   showMessage('Skipped');
  //   disposition('skipped');
  // }

  return (
    <div>
      <Typography
        variant="body1"
        component="li"
        style={{ fontWeight: 'bold', lineHeight: '3em', color: disabled ? 'darkgray' : 'initial' }}
      >
        {action.fields.Title}
        &nbsp;&nbsp;
        {done ? (
          <Button variant="outlined" color="secondary" size="small" onClick={handleClickOpen}>
            Done!
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleClickOpen}
            disabled={disabled}
          >
            Start
          </Button>
        )}
      </Typography>

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
                    checked={!!verifications[i]}
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
          {!useIndicative && (
            <Button onClick={handleCompleted} color="primary" autoFocus>
              Completed
            </Button>
          )}
          {allVerified && (
            <Button onClick={handleDone} color="secondary" autoFocus>
              Done!
            </Button>
          )}
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Action.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  action: AirtablePropTypes.action.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
  disabled: PropTypes.bool.isRequired,
  onDone: PropTypes.func.isRequired,
};

export default withMobileDialog()(Action);
