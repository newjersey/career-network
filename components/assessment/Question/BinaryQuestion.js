import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';

import AirtablePropTypes from '../../Airtable/PropTypes';

const useStyles = makeStyles(theme => ({
  label: {
    fontWeight: 500,
  },
  formHelperText: {
    margin: theme.spacing(0, 0, 2, 4),
    ...theme.typography.helperText,
  },
  card: {
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(1),
  },
  cardSelected: {
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(1),
    backgroundColor: 'rgba(24, 129, 197, 0.07)',
  },
}));

export default function BinaryQuestion(props) {
  const { onChange, onValidationChange, question, value } = props;
  const checkbox = useRef(null);
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // hack: persist check box values when they're first rendered,
    // otherwise we don't get "false" recorded on checkboxes never touched.
    onChange(checkbox.current.checked);
    if (checkbox.current.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [onChange]);

  useEffect(() => {
    // always report as valid (since there's no real "incomplete" state)
    onValidationChange(true);
  }, [onValidationChange]);

  return (
    <Card className={checked ? classes.cardSelected : classes.card} variant="outlined">
      <FormControlLabel
        classes={{
          label: classes.label,
        }}
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
    </Card>
  );
}

BinaryQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  question: AirtablePropTypes.question.isRequired,
  value: PropTypes.bool.isRequired,
};
