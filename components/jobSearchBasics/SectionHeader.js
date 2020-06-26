import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 1.4,
    color: theme.palette.background.dark,
    letterSpacing: 0.25,
  },
});

const SectionHeader = ({ children, classes, ...rest }) => (
  <Typography variant="h3" className={classes.root} {...rest}>
    {children}
  </Typography>
);

SectionHeader.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(SectionHeader);
