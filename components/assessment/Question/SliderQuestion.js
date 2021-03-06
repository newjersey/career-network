import { makeStyles, withStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../../Airtable/PropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(6),
  },
  helperText: {
    ...theme.typography.helperText,
    marginBottom: theme.spacing(3),
  },
  divider: {
    margin: theme.spacing(6, 0, 2),
  },
}));

const height = 6;
const StyledSlider = withStyles({
  root: {
    height,
    paddingRight: height / -2,
  },
  thumb: {
    height: height * 3,
    width: height * 3,
    marginTop: -height,
    marginLeft: -height * 1.5,
  },
  valueLabel: {
    left: `calc(-50% + ${height / 2}px)`,
  },
  mark: {
    height,
    width: height,
    borderRadius: height / 2,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
  track: {
    height,
    borderRadius: height / 2,
  },
  rail: {
    height,
    borderRadius: height / 2,
    paddingRight: height / 2,
  },
})(Slider);

export default function SliderQuestion(props) {
  const classes = useStyles();
  const {
    onChange,
    onChangeCommitted,
    onValidationChange,
    question,
    min,
    max,
    step,
    value,
    isLastInGroup,
  } = props;

  const helperText = question.fields['Helper Text'];

  const marks = [];
  for (let n = min; n <= max; n += step) {
    const label = n === min || n === max ? `${n} Hours` : null;
    marks.push({ value: n, label });
  }

  const handleChange = (_e, _localValue) => onChange(_localValue);
  const handleChangeCommitted = (_e, _value) => onChangeCommitted(_value);

  useEffect(() => {
    // always report as valid (since there's no real "incomplete" state)
    onValidationChange(true);
  }, [onValidationChange]);

  return (
    <div className={classes.root}>
      <FormLabel component="legend">
        <Typography variant="h6" style={{ color: '#0c4163' }}>
          {question.fields.Label}
        </Typography>
      </FormLabel>
      {helperText && <FormHelperText className={classes.helperText}>{helperText}</FormHelperText>}
      <StyledSlider
        aria-label={question.fields.Label}
        aria-valuetext={`${value}`}
        disabled={question.fields.Disabled}
        min={min}
        max={max}
        marks={marks}
        name={question.id}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        value={value}
        valueLabelDisplay="auto"
      />
      {!isLastInGroup && <Divider className={classes.divider} />}
    </div>
  );
}

SliderQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeCommitted: PropTypes.func.isRequired,
  question: AirtablePropTypes.question.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number,
  onValidationChange: PropTypes.func.isRequired,
  isLastInGroup: PropTypes.bool,
};

SliderQuestion.defaultProps = {
  value: 0,
  isLastInGroup: false,
};
