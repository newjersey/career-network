import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import ToggleButton from '../ToggleButton';

const COUNY_NAMES = [
  'Atlantic County',
  'Bergen County',
  'Burlington County',
  'Camden County',
  'Cape May County',
];

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 2, 1, 0),
  },
}));

export default function CountyList(props) {
  const { county, onChange } = props;
  const classes = useStyles();

  return (
    <ToggleButton
      className={classes.toggleButton}
      options={COUNY_NAMES}
      value={county}
      handleChange={e => onChange(e)}
    />
  );
}

CountyList.propTypes = {
  county: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
