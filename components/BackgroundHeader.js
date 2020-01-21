import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  header: {
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.background.header,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

function BackgroundHeader(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <Box className={classes.header} display="flex" alignItems="flex-start">
      {children}
    </Box>
  );
}

BackgroundHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

BackgroundHeader.defaultProps = {
  children: [],
};

export default BackgroundHeader;
