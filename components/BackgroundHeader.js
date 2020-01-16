import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  default: {
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.background.header,
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(5),
  },
}));

function BackgroundHeader(props) {
  const { children, className } = props;
  const classes = useStyles();

  return (
    <Box className={`${classes.default} ${className}`} display="flex" alignItems="flex-start">
      {children}
    </Box>
  );
}

BackgroundHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
};

BackgroundHeader.defaultProps = {
  children: [],
  className: undefined,
};

export default BackgroundHeader;
