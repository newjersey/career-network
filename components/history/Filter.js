import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
  formControlLabel: {
    marginBottom: theme.spacing(1),
  },
}));

export default function Filter(props) {
  const classes = useStyles();
  const { catchAll, filterOptions, onChange } = props;

  const sortFunc = (a, b) => {
    if (a === catchAll) return 1;
    if (b === catchAll) return -1;

    return a < b ? -1 : 1;
  };

  return (
    <FormControl>
      <FormGroup>
        {Object.keys(filterOptions)
          .sort(sortFunc)
          .map(option => (
            <FormControlLabel
              key={option}
              classes={{
                root: classes.formControlLabel,
              }}
              control={
                <Checkbox
                  onChange={onChange(option)}
                  value={option}
                  checked={filterOptions[option] === undefined ? true : filterOptions[option]}
                />
              }
              label={option}
            />
          ))}
      </FormGroup>
    </FormControl>
  );
}

Filter.propTypes = {
  filterOptions: PropTypes.objectOf(PropTypes.bool).isRequired,
  onChange: PropTypes.func.isRequired,
  catchAll: PropTypes.string.isRequired,
};

Filter.defaultProps = {};
