import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import React, { useCallback, useState } from 'react';
import Select from '@material-ui/core/Select';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: '15em',
  },
}));

const UNEMPLOYMENT_TERMS = [
  { value: 'short', label: 'I am recently unemployed' },
  { value: 'long', label: 'I have been unemployed for a while' },
  { value: 'indefinite', label: 'I have never had a job' },
];

function CircumstancePicker() {
  const classes = useStyles();
  const [unemploymentTerm, setUnemploymentTerm] = useState('');
  const [labelWidth, setLabelWidth] = useState(0);

  // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setLabelWidth(node.offsetWidth);
    }
  }, []);

  return (
    <form autoComplete="off">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="circumstance-picker-outlined" ref={measuredRef}>
          What brings you here?
        </InputLabel>
        <Select
          value={unemploymentTerm}
          onChange={e => setUnemploymentTerm(e.target.value)}
          input={
            <OutlinedInput
              labelWidth={labelWidth}
              name="unemploymentTerm"
              id="circumstance-picker-outlined"
            />
          }
        >
          {UNEMPLOYMENT_TERMS.map(term => (
            <MenuItem value={term.value} key={term.value}>
              {term.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}

export default CircumstancePicker;
