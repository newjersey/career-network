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
  const { value, onChange, weeks } = props;

  return (
    <Select
      className={classes.select}
      displayEmpty
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <MenuItem value={-1}>
        <Typography variant="body2">View All Weeks</Typography>
      </MenuItem>
      {weeks.map((week, index) => (
        <MenuItem key={week} value={index}>
          <Typography variant="body2" color="textSecondary">
            Week {weeks.length - index}
          </Typography>
        </MenuItem>
      ))}
    </Select>
  );
}

WeekSelect.propTypes = {
  value: PropTypes.number.isRequired,
  weeks: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  onChange: PropTypes.func.isRequired,
};

WeekSelect.defaultProps = {
  weeks: [],
};
