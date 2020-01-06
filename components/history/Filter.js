import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import React from 'react';

export default function Filter(props) {
  const { filterOptions, onChange } = props;

  return (
    <div>
      <FormControl>
        <FormGroup>
          {Object.keys(filterOptions).map(option => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  onChange={onChange(option)}
                  value={option}
                  label={option}
                  checked={filterOptions[option] === undefined ? true : filterOptions[option]}
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}

Filter.propTypes = {
  filterOptions: PropTypes.objectOf(PropTypes.bool).isRequired,
  onChange: PropTypes.func.isRequired,
};

Filter.defaultProps = {};
