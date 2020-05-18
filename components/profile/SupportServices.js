import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { useAuth } from '../Auth';
import { DialogTitle, DialogContent } from '../DialogComponents';
import BinaryQuestion from './BinaryQuestion';

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2, 6, 4, 6),
  },
  title: {
    marginTop: theme.spacing(2),
    color: '#0c4163',
  },
}));

const MAX_WIDTH = 'md';

function SupportServices({ show, onClose, items }) {
  const classes = useStyles();
  const { userDocRef } = useAuth();
  const [values, setValues] = useState(items);

  const onChange = (val, slug) => {
    values.find(option => option.slug === slug).value = val;
    setValues(values);
  };

  const handleClose = () => {
    const data = {
      supportServices: values,
      lastUpdateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    userDocRef.set({ userProfile: data }, { merge: true });
    onClose();
  };

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={show}
      onClose={handleClose}
      scroll="paper"
      maxWidth={MAX_WIDTH}
      aria-labelledby="support-services-dialog"
    >
      <DialogTitle id="support-services-dialog-title" onClose={handleClose}>
        <Typography variant="h6" className={classes.title}>
          Support Services
        </Typography>
        <Typography variant="body2">
          We understand that searching for work can impact all parts of your life. There are
          services available to help.
        </Typography>
      </DialogTitle>
      <DialogContent>
        {values.map(item => (
          <BinaryQuestion
            value={item.value}
            label={item.label}
            slug={item.slug}
            helperText={item.helperText}
            onChange={onChange}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleClose}
          fullWidth
          color="primary"
          style={{ marginTop: '1rem' }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SupportServices.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withMobileDialog()(SupportServices);
