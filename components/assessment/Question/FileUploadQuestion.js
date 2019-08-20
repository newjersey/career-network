import path from 'path';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import AirtablePropTypes from '../../Airtable/PropTypes';
import useStorage from '../../Firebase/useStorage';
import { useAuth } from '../../Auth';
import { useSnackbar } from '../../Snackbar';

const useStyles = makeStyles(theme => ({
  fileUpload: {
    paddingTop: theme.spacing(3),
  },
  uploadWrapper: {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
  },

  fileInput: {
    fontSize: '100px',
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0,
  },
  acceptedExtensions: {
    fontSize: '0.7rem',
  },
}));

export default function FileUploadQuestion(props) {
  const classes = useStyles();
  const { question, value, onChange } = props;
  const { user } = useAuth();
  const { upload, remove } = useStorage();
  const showMessage = useSnackbar();
  const [uploadedFile, setUploadedFile] = useState(value);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    try {
      const uploadResult = await upload(file, `assessments/${user.uid}`, {
        customMetadata: {
          assignedCoach: user.assignedCoach,
        },
      });
      setUploadedFile(uploadResult.ref.fullPath);
      onChange(uploadResult.ref.fullPath);
    } catch (error) {
      showMessage(`File '${file.name}' could not be uploaded.`);
      // TODO: report error properly in Sentry or similar service.
    }
  };

  const handleRemove = async () => {
    try {
      await remove(uploadedFile);
      setUploadedFile(undefined);
      onChange('');
    } catch (error) {
      showMessage(`File '${path.basename(uploadedFile)}' could not be removed.`);
      // TODO: report error properly in Sentry or similar service.
    }
  };

  return (
    <Grid container className={classes.fileUpload} spacing={1}>
      <Grid container item xs={1} justify="flex-end">
        {uploadedFile ? <CheckCircleIcon color="secondary" /> : <AssignmentIcon color="action" />}
      </Grid>
      <Grid item xs={8}>
        <Typography variant="subtitle1">
          <strong>{question.fields.Label}</strong>
        </Typography>
        {uploadedFile ? (
          <Typography variant="body2" color="textSecondary">
            {path.basename(uploadedFile)}
          </Typography>
        ) : (
          <Typography variant="body2">{question.fields['Helper Text']}</Typography>
        )}
      </Grid>
      <Grid item xs={3}>
        {uploadedFile ? (
          <Button variant="outlined" size="small" onClick={handleRemove}>
            Remove
          </Button>
        ) : (
          <div className={classes.uploadWrapper}>
            <Button variant="outlined" size="small" color="primary">
              Upload
            </Button>
            <input
              type="file"
              className={classes.fileInput}
              onChange={handleUpload}
              data-testid="fileInput"
            />
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.acceptedExtensions}
            >
              .jpg, .pdf, .doc or .txt files
            </Typography>
          </div>
        )}
      </Grid>
    </Grid>
  );
}

FileUploadQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  question: AirtablePropTypes.question.isRequired,
  value: PropTypes.string,
};

FileUploadQuestion.defaultProps = {
  value: undefined,
};
