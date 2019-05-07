import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
  },
});

function Oval(props) {
  const { classes, style, variant } = props;

  const args = {
    src: `/static/img/index/oval${variant ? `-${variant}` : ''}.svg`,
    className: classes.root,
    style,
  };

  return <img {...args} />;
}

Oval.propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['phone', 'state']),
  style: PropTypes.object,
};

Oval.defaultProps = {
  style: {},
};

export default withStyles(styles)(Oval);
