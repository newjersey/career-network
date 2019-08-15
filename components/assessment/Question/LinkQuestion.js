import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/styles';

import AirtablePropTypes from '../../Airtable/PropTypes';

const useStyles = makeStyles(theme => ({
  link: {
    paddingTop: theme.spacing(3),
  },
}));

export default function LinkQuestion(props) {
  const classes = useStyles();
  const { question, value, onChange } = props;
  const [link, setLink] = useState(value);
  const [linkInput, setLinkInput] = useState(value);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleLinkInputChange = (event) => {
    setLinkInput(event.target.value);
  };

  const handleAddLink = () => {
    setLink(linkInput);
    onChange(linkInput);
    setModalOpen(false);
  };

  const handleRemove = async () => {
    setLink('');
    setLinkInput('');
    onChange('');
  };

  return (
    <Grid container className={classes.link} spacing={1}>
      <Grid container item xs={1} justify="flex-end">
        {link ? <CheckCircleIcon color="secondary" /> : <LinkIcon color="action" />}
      </Grid>
      <Grid item xs={8}>
        <Typography variant="subtitle1">
          <strong>{question.fields.Label}</strong>
        </Typography>
        {link ? (
          <Typography variant="body2" color="textSecondary">
            {link}
          </Typography>
        ) : (
          <Typography variant="body2">{question.fields['Helper Text']}</Typography>
        )}
      </Grid>
      <Grid item xs={3}>
        {link ? (
          <Button variant="outlined" size="small" onClick={handleRemove}>
            Remove
          </Button>
        ) : (
          <Button variant="outlined" size="small" color="primary" onClick={handleModalOpen}>
            Add Link
          </Button>
        )}
      </Grid>
      <Dialog open={modalOpen} onClose={handleModalClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{question.fields.Label}</DialogTitle>
        <DialogContent>
          <DialogContentText>{question.fields['Helper Text']}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Link"
            type="text"
            fullWidth
            value={linkInput}
            onChange={handleLinkInputChange}
            inputProps={{ 'data-testid': 'linkInput' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddLink} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

LinkQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  question: AirtablePropTypes.question.isRequired,
  value: PropTypes.string,
};

LinkQuestion.defaultProps = {
  value: '',
};
