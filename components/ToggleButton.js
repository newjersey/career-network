import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 2, 1, 0),
  },
}));

function ToggleButton({ options, value, handleChange, multiSelect }) {
  const [selected, setSelected] = useState(value);
  const classes = useStyles();

  const isSelected = v => (multiSelect ? selected.includes(v) : selected === v);
  const addSelected = v => (multiSelect ? [...selected, v] : v);
  const removeSelected = v => (multiSelect ? selected.filter(el => el !== v) : undefined);

  const handleUpdate = v => {
    const newSelection = isSelected(v) ? removeSelected(v) : addSelected(v);

    handleChange(newSelection);
    setSelected(newSelection);
  };

  return (
    <Grid container>
      {options.map(opt => (
        <Button
          key={opt}
          className={classes.button}
          variant="contained"
          onClick={() => handleUpdate(opt)}
          color={isSelected(opt) ? 'primary' : 'default'}
        >
          {opt}
        </Button>
      ))}
    </Grid>
  );
}

ToggleButton.defaultProps = {
  multiSelect: false,
};

ToggleButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
  handleChange: PropTypes.func.isRequired,
  multiSelect: PropTypes.bool,
};

export default ToggleButton;
