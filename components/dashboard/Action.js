import Button from '@material-ui/core/Button';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../Airtable/PropTypes';

export default function Action(props) {
  // const classes = useStyles();
  // const showMessage = useSnackbar();
  // const { userDocRef } = useAuth();
  // const [expanded, setExpanded] = React.useState(false);
  const { action } = props;

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
    <Typography variant="body1" component="li" style={{ fontWeight: 'bold', lineHeight: '3em' }}>
      {action.fields.Title}
      &nbsp;&nbsp;
      <Button variant="contained" color="primary" size="small">
        Start
      </Button>
    </Typography>
  );
}

Action.propTypes = {
  action: AirtablePropTypes.action.isRequired,
};
