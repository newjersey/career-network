import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const INDUSTRY_OPTIONS = [
  'Accommodation and Food Services',
  'Administration, Business Support and Waste Management',
  'Agriculture, Forestry, Fishing and Hunting',
  'Arts, Entertainment and Recreation',
  'Construction',
  'Educational Services',
  'Finance and Insurance',
  'Information & Media',
  'Manufacturing',
  'Mining',
  'Other Services',
  'Professional, Scientific and Technical Services',
  'Real Estate and Rental / Leasing',
  'Retail & Trade',
  'Transportation and Warehousing',
  'Utilities',
  'Wholesale Trade',
];

const useStyles = makeStyles(theme => ({
  placeholder: {
    color: 'currentColor',
    opacity: theme.palette.type === 'light' ? 0.42 : 0.5,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

export default function IndustryDropdown(props) {
  const classes = useStyles();
  const { value, onChange } = props;

  return (
    <FormControl fullWidth>
      <span>Industry</span>
      <Select
        variant="outlined"
        inputProps={{ name: 'industry' }}
        onChange={onChange}
        value={value}
        displayEmpty
        renderValue={option =>
          option || (
            <Typography variant="body1" className={classes.placeholder}>
              What industry do you feel is most relevant for this job?
            </Typography>
          )
        }
      >
        {INDUSTRY_OPTIONS.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

IndustryDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
