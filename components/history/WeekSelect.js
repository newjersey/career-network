import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  select: {
    width: '120px',
  },
});

export default function WeekSelect(props) {
  const classes = useStyles();
  const { totalWeeks, value, onChange } = props;

  const weeksTemp = [...Array(totalWeeks + 1).keys()];
  const weeks = [...weeksTemp.slice(1), 0];

  return (
    <Select
      className={classes.select}
      displayEmpty
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {weeks.reverse().map(week => (
        <MenuItem key={week} value={week}>
          {week !== 0 ? (
            <Typography variant="body2" color="textSecondary">
              Week {week}
            </Typography>
          ) : (
            <Typography variant="body2">View All Weeks</Typography>
          )}
        </MenuItem>
      ))}
    </Select>
  );
}

WeekSelect.propTypes = {
  totalWeeks: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
