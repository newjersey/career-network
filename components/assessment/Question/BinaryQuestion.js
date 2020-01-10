import { makeStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

import AirtablePropTypes from '../../Airtable/PropTypes';

const useStyles = makeStyles(theme => ({
  formHelperText: {
    margin: theme.spacing(0, 0, 2, 4),
  },
}));

export default function BinaryQuestion(props) {
  const { onChange, onValidationChange, question, value } = props;
  const checkbox = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    // hack: persist check box values when they're first rendered,
    // otherwise we don't get "false" recorded on checkboxes never touched.
    onChange(checkbox.current.checked);
  }, [onChange]);

  useEffect(() => {
    // always report as valid (since there's no real "incomplete" state)
    onValidationChange(true);
  }, [onValidationChange]);

  return (
    <>
      <FormControlLabel
        disabled={question.fields.Disabled}
        label={question.fields.Label}
        control={
          <Checkbox
            color="primary"
            checked={value}
            value={question.id}
            inputRef={checkbox}
            onChange={e => onChange(e.target.checked)}
          />
        }
      />
      {question.fields['Helper Text'] && (
        <FormHelperText className={classes.formHelperText}>
          {question.fields['Helper Text']}
        </FormHelperText>
      )}
    </>
  );
}

BinaryQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  question: AirtablePropTypes.question.isRequired,
  value: PropTypes.bool.isRequired,
};
