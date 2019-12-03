import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function ToggleButton({ options, value, handleChange, ...otherProps }) {
  return (
    <Grid item xs={12} md={6} {...otherProps}>
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
    </Grid>
  );
}

ToggleButton.propTypes = {
  otherProps: PropTypes.oneOfType([PropTypes.object, PropTypes.any]).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
  handleChange: PropTypes.func.isRequired,
};
