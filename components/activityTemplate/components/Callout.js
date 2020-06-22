import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3, 0),
    padding: theme.spacing(10, 12),
    borderStyle: 'solid',
    borderWidth: `1px 1px 1px 4px`,
    borderRadius: theme.spacing(0, 1, 1, 0),
    borderColor: theme.palette.grey['200'],
    borderLeftColor: theme.palette.navy.primary,
  },
}));

function Callout({ content, variant, ...restProps }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="body1" {...restProps}>
        {content}
      </Typography>
    </div>
  );
}

Callout.propTypes = {
  content: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['pro-tip', 'quote']).isRequired,
};

Callout.displayName = 'Callout';

export default Callout;
