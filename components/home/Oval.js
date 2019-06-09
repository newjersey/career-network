import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
  },
}));

function Oval(props) {
  const { style, variant } = props;
  const classes = useStyles();

  const args = {
    alt: '',
    src: `/static/img/index/oval${variant ? `-${variant}` : ''}.svg`,
    className: classes.root,
    style,
  };

  return <img {...args} />;
}

Oval.propTypes = {
  variant: PropTypes.oneOf(['phone', 'state']),
  style: PropTypes.object,
};

Oval.defaultProps = {
  style: {},
};

export default Oval;
