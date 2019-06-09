import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  root: {
  },
}));

function Oval(props) {
  const { style, variant } = props;
  const classes = useStyles();

  return (
    <img
      alt=""
      src={`/static/img/index/oval${variant ? `-${variant}` : ''}.svg`}
      className={classes.root}
      style={style}
    />
  );
}

Oval.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
  variant: PropTypes.oneOf(['phone', 'state']),
};

Oval.defaultProps = {
  style: {},
  variant: undefined,
};

export default Oval;
