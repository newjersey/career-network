import { makeStyles, withStyles } from '@material-ui/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import Slider from '@material-ui/core/Slider';

import AirtablePropTypes from '../../Airtable/PropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

const height = 6;
const StyledSlider = withStyles({
  root: {
    // color: '#52af77',
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
    // backgroundColor: '#bfbfbf',
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
  const { onChange, onChangeCommitted, question, min, max, step, value } = props;

  const helperText = question.fields['Helper Text'];

  const marks = [];
  for (let n = min; n <= max; n += step) {
    const label = n === min || n === max ? n : null;
    marks.push({ value: n, label });
  }

  const handleChange = (_e, _localValue) => onChange(_localValue);
  const handleChangeCommitted = (_e, _value) => onChangeCommitted(_value);

  return (
    <div className={classes.root}>
      <FormLabel component="legend">{question.fields.Label}</FormLabel>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}

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
};

SliderQuestion.defaultProps = {
  value: 0,
};
