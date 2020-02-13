import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 2, 1, 0),
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: 'black',
    color: 'white',
    boxShadow: 'none',
  },
}));

function ToggleButton(props) {
  const classes = useStyles();
  const {
    options,
    disabledOptions,
    value,
    handleChange,
    multiSelect,
    buttonClassName,
    buttonVariant,
    containerClassName,
    disabledMessage,
  } = props;
  const [selected, setSelected] = useState(value);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopover, setOpenPopover] = useState(false);

  const isDisabled = v => disabledOptions.includes(v);
  const isSelected = v => (multiSelect ? selected.includes(v) : selected === v);
  const addSelected = v => (multiSelect ? [...selected, v] : v);
  const removeSelected = v => (multiSelect ? selected.filter(el => el !== v) : '');
  const hasPopover = v => disabledMessage && isDisabled(v);

  const handleUpdate = v => {
    const newSelection = isSelected(v) ? removeSelected(v) : addSelected(v);

    handleChange(newSelection);
    setSelected(newSelection);
  };

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setOpenPopover(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (disabledOptions.includes(value)) {
      setSelected('');
    } else {
      setSelected(value);
    }
  }, [disabledOptions, value]);

  useEffect(() => {
    setOpenPopover(Boolean(anchorEl));
  }, [anchorEl]);

  return (
    <Grid container className={containerClassName}>
      {options.map(opt => (
        <Grid
          item
          className={clsx(classes.button, buttonClassName)}
          key={opt}
          aria-owns={hasPopover(opt) ? 'mouse-over-popover' : undefined}
          aria-haspopup={hasPopover(opt) ? 'true' : 'false'}
          onMouseEnter={hasPopover(opt) ? handlePopoverOpen : undefined}
          onMouseLeave={handlePopoverClose}
        >
          <Button
            style={{ height: '40px' }}
            fullWidth
            variant={buttonVariant}
            onClick={() => handleUpdate(opt)}
            color={isSelected(opt) ? 'primary' : 'default'}
            disabled={isDisabled(opt)}
          >
            {opt}
          </Button>
          {hasPopover(opt) && (
            <Popover
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={openPopover}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography variant="body2">{disabledMessage}</Typography>
            </Popover>
          )}
        </Grid>
      ))}
    </Grid>
  );
}

ToggleButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabledOptions: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
  handleChange: PropTypes.func.isRequired,
  multiSelect: PropTypes.bool,
  buttonClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  buttonVariant: PropTypes.string,
  disabledMessage: PropTypes.string,
};

ToggleButton.defaultProps = {
  disabledOptions: [],
  multiSelect: false,
  buttonClassName: undefined,
  buttonVariant: 'contained',
  containerClassName: undefined,
  disabledMessage: '',
};

export default ToggleButton;
