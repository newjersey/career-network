import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  padding: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
}));

function ScaffoldContainer(props) {
  const { children, padding, marginTopValue } = props;
  const classes = useStyles();

  const marginTop = {
    marginTop: marginTopValue,
  };

  return (
    <Grid container justify="center" alignItems="center" style={marginTop}>
      <Grid item xs={12} lg={10} className={clsx(padding && classes.padding)}>
        {children}
      </Grid>
    </Grid>
  );
}

ScaffoldContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  padding: PropTypes.bool,
  marginTopValue: PropTypes.string,
};

ScaffoldContainer.defaultProps = {
  padding: true,
  marginTopValue: '0px',
};

export default ScaffoldContainer;
