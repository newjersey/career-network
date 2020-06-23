import React from 'react';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: theme.palette.navy['500'],
    borderStyle: 'solid',
    borderRadius: 3,
    padding: theme.spacing(4),
    position: 'relative',
    backgroundColor: theme.palette.background.header,
    color: theme.palette.grey['900'],
    display: 'flex',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    backgroundColor: theme.palette.navy['500'],
    width: 40,
    height: 40,
    left: -20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    fontWeight: 700,
    color: theme.palette.background.paper,
  },
}));

function Citation({ label, url, index, ...restProps }) {
  const classes = useStyles(restProps);

  return (
    <div className={classes.root}>
      <div className={classes.circle}>{index + 1}</div>
      <Link href={url} target="_blank" variant="h5" underline="always" color="inherit">
        {label}
      </Link>
    </div>
  );
}

Citation.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

Citation.displayName = 'Citation';

export default Citation;
