import { makeStyles } from '@material-ui/styles';
import InfoIcon from '@material-ui/icons/Info';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import isValidDate from 'date-fns/isValid';
import DateInput from '../../DateInput';
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
    inputProps,
    isInGroup,
    onChange,
    optional,
    onValidationChange,
    question,
    reflectValidity,
    value,
    ...restProps
  } = props;
  const initialValue = value ? parseISO(value) : undefined;
  const [selectedDate, setSelectedDate] = useState(initialValue);
  const isValid = optional || (!!value && isValidDate(selectedDate));
  const reflectError = reflectValidity && !isValid;
  const helperText = question.fields['Helper Text'];
  const placeholderText = question.fields['Hint Text'];

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  const handleChange = date => {
    setSelectedDate(date);
    if (isValidDate(date)) {
      onChange(format(date, 'yyyy-MM-dd'));
    }
  };

  return (
    <>
      <span>{question.fields.Label}</span>
      <DateInput
        id={question.id}
        disabled={question.fields.Disabled}
        className={classes.textField}
        onChange={handleChange}
        placeholder={placeholderText}
        value={selectedDate}
        inputProps={inputProps}
        FormHelperTextProps={{ classes: { root: classes.helperText } }}
        helperText={
          helperText && (
            <>
              <InfoIcon color="primary" style={{ fontSize: '1.2rem', marginRight: '0.5rem' }} />
              <span>{helperText}</span>
            </>
          )
        }
        error={reflectError}
        {...restProps}
      />
    </>
  );
}

DateQuestion.propTypes = {
  inputProps: PropTypes.shape({
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
  }),
  isInGroup: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  optional: PropTypes.bool.isRequired,
  question: AirtablePropTypes.question.isRequired,
  reflectValidity: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

DateQuestion.defaultProps = {
  inputProps: {},
  isInGroup: false,
  reflectValidity: false,
};
