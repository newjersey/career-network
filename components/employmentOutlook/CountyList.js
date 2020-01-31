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
  'Cumberland County',
  'Essex County',
  'Glouchester County',
  'Hudson County',
  'Hunterdon County',
  'Mercer County',
  'Middlesex County',
  'Monmouth County',
  'Morris County',
  'Ocean County',
  'Passaic County',
  'Salem County',
  'Somerset County',
  'Sussex County',
  'Union County',
  'Warren County',
];

const useStyles = makeStyles(theme => ({
  countyButton: {
    width: theme.spacing(35),
  },
}));

export default function CountyList(props) {
  const { value, onChange } = props;
  const classes = useStyles();

  return (
    <ToggleButton
      buttonClassName={classes.countyButton}
      options={COUNY_NAMES}
      value={value}
      handleChange={e => onChange(e)}
    />
  );
}

CountyList.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
