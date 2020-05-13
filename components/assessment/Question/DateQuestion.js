import { makeStyles } from '@material-ui/styles';
import InfoIcon from '@material-ui/icons/Info';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import AirtablePropTypes from '../../Airtable/PropTypes';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontWeight: 500,
  },
  helperText: {
    display: 'flex',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    backgroundColor: theme.palette.background.header,
    margin: theme.spacing(0.5, 0),
    padding: theme.spacing(1),
  },
}));

export default function DateQuestion(props) {
  const classes = useStyles();
  const {
    views,
    isInGroup,
    onChange,
    optional,
    onValidationChange,
    question,
    reflectValidity,
    value,
    ...restProps
  } = props;
  const isValid = optional || !!value;
  const reflectError = reflectValidity && !isValid;
  const helperText = question.fields['Helper Text'];
  const placeholder = question.fields['Hint Text'];

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  const handleChange = (date, newVal) => onChange(newVal);

  return (
    <>
      <span>{question.fields.Label}</span>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          id={question.id}
          disableToolbar
          disabled={question.fields.Disabled}
          className={classes.textField}
          variant="inline"
          placeholder={placeholder}
          views={views}
          helperText={
            helperText && (
              <>
                <InfoIcon color="primary" style={{ fontSize: '1.2rem', marginRight: '0.5rem' }} />
                <span>{helperText}</span>
              </>
            )
          }
          value={value}
          onChange={handleChange}
          openTo={views[0]}
          fullWidth
          inputVariant="outlined"
          KeyboardButtonProps={{ 'aria-label': question.fields.Label }}
          FormHelperTextProps={{ classes: { root: classes.helperText } }}
          error={reflectError}
          {...restProps}
        />
      </MuiPickersUtilsProvider>
    </>
  );
}

DateQuestion.propTypes = {
  isInGroup: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  optional: PropTypes.bool.isRequired,
  question: AirtablePropTypes.question.isRequired,
  reflectValidity: PropTypes.bool,
  value: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.oneOf(['day', 'month', 'year'])),
};

DateQuestion.defaultProps = {
  isInGroup: false,
  reflectValidity: false,
  views: ['month', 'year'],
};
