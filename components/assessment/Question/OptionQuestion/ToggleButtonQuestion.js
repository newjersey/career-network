import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../../../Airtable/PropTypes';
import ToggleButton from '../../../ToggleButton';

const useStyles = makeStyles(theme => ({
  toggleButton: {
    textTransform: 'capitalize',
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    width: '100%',
  },
  button: {
    width: '47%',
    height: theme.spacing(5.5),
    marginBottom: theme.spacing(2),
    margin: 'auto',
  },
  fullWidthButton: {
    width: '100%',
    height: theme.spacing(5.5),
    marginBottom: theme.spacing(2),
  },
  helperText: {
    ...theme.typography.helperText,
    marginBottom: theme.spacing(3),
  },
  divider: {
    margin: theme.spacing(2, 0, 6),
  },
  largeLabel: {
    fontSize: '1.25rem',
    fontWeight: 500,
    color: '#0c4163',
  },
}));

export default function ToggleButtonQuestion(props) {
  const classes = useStyles();
  const {
    onChange,
    onValidationChange,
    optional,
    question,
    reflectValidity,
    responseOptions,
    value,
    useFullWidthButton,
    isLastInGroup,
  } = props;

  const helperText = question.fields['Helper Text'];
  const isValid = optional || !!value || value === 0;
  const reflectError = reflectValidity && !isValid;

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  const HelperText = () => (
    <FormHelperText className={classes.helperText}>{helperText}</FormHelperText>
  );

  const options = responseOptions.map(option => option.fields.Name);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <FormLabel component="legend" error={reflectError}>
          <Typography
            variant="body2"
            className={helperText ? classes.largeLabel : null}
            gutterBottom
          >
            {question.fields.Label}
          </Typography>
        </FormLabel>
        {helperText && <HelperText />}
        <ToggleButton
          classNameOverrides={{ label: classes.toggleButton }}
          options={options}
          value={value}
          handleChange={onChange}
          buttonVariant="outlined"
          selectedButtonVariant="contained"
          buttonClassName={useFullWidthButton ? classes.fullWidthButton : classes.button}
          disableDeselect
        />
      </FormControl>
      {helperText && !isLastInGroup && <Divider className={classes.divider} />}
    </div>
  );
}

ToggleButtonQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  optional: PropTypes.bool.isRequired,
  question: AirtablePropTypes.question.isRequired,
  reflectValidity: PropTypes.bool,
  responseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  value: PropTypes.string,
  useFullWidthButton: PropTypes.bool,
  isLastInGroup: PropTypes.bool,
};

ToggleButtonQuestion.defaultProps = {
  reflectValidity: false,
  value: null,
  useFullWidthButton: false,
  isLastInGroup: false,
};
