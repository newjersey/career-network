import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 2, 1, 0),
  },
}));

function ToggleButton(props) {
  const { options, value, handleChange, multiSelect, buttonClassName } = props;
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

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <Grid container>
      {options.map(opt => (
        <Grid item>
          <Button
            key={opt}
            className={clsx(classes.button, buttonClassName)}
            variant="outlined"
            onClick={() => handleUpdate(opt)}
            color={isSelected(opt) ? 'primary' : 'default'}
          >
            {opt}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

ToggleButton.defaultProps = {
  multiSelect: false,
  buttonClassName: PropTypes.string,
};

ToggleButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
  handleChange: PropTypes.func.isRequired,
  multiSelect: PropTypes.bool,
  buttonClassName: undefined,
};

export default ToggleButton;
