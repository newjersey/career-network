import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function ToggleButton({ options, value, handleChange, multiSelect }) {
  const [selected, setSelected] = useState(value);
  const classes = useStyles();

  const isSelected = v => (multiSelect ? selected.includes(v) : selected === v);
  const addSelected = v => (multiSelect ? setSelected([...selected, v]) : setSelected(v));
  const removeSelected = v =>
    multiSelect ? setSelected(selected.filter(el => el === v)) : setSelected();

  const handleUpdate = v => {
    if (isSelected(v)) {
      removeSelected(v);
    } else {
      addSelected(v);
    }
    handleChange(v);
  };
  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
      {options.map(opt => (
        <Button
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
  handleChange: PropTypes.func.isRequired,
  multiSelect: PropTypes.bool,
};

export default ToggleButton;
