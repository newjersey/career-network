import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Linkify from 'linkifyjs/react';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../Airtable/PropTypes';

export default function Action(props) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // const classes = useStyles();
  // const showMessage = useSnackbar();
  // const { userDocRef } = useAuth();
  // const [expanded, setExpanded] = React.useState(false);
  const { action, allQualityChecks } = props;

  const qualityChecks = allQualityChecks.filter(
    qc => action.fields['Action ID'] === qc.fields['Action ID'][0]
  );

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
      <Typography variant="body1" component="li" style={{ fontWeight: 'bold', lineHeight: '3em' }}>
        {action.fields.Title}
        &nbsp;&nbsp;
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleClickOpen}
          disabled={action.fields.Order > 1}
        >
          Start
        </Button>
      </Typography>

      <Dialog
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
          <br />
          <Typography>Be sure to:</Typography>
          <ul>
            {qualityChecks.map(qc => (
              <Typography component="li" key={qc.id}>
                {qc.fields.Imperative}
              </Typography>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Completed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Action.propTypes = {
  action: AirtablePropTypes.action.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
};
