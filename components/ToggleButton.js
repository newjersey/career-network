import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function ToggleButton({ options, value, handleChange }) {
  return (
    <ButtonGroup fullWidth>
      {options.map(opt => (
        <Button
          variant="contained"
          onClick={() => handleChange(opt)}
          color={value === opt ? 'primary' : 'default'}
        >
          {opt}
        </Button>
      ))}
    </ButtonGroup>
  );
}

ToggleButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ToggleButton;
