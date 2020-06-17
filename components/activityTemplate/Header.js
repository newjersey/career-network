import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { JOB_SEARCH_CATEGORIES, MILESTONE_TYPES } from '../../constants';

const useStyles = makeStyles(theme => ({
  navBar: {
    backgroundColor: '#FFFFFF',
  },
  userBar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { title, category, milestone } = props;

  const categoryLabel = JOB_SEARCH_CATEGORIES.find(cat => cat.slug === category);
  const milestoneLabel = MILESTONE_TYPES.find(ms => ms.slug === milestone);

  return (
    <div className={classes.root}>
      <Typography variant="body2">{categoryLabel}</Typography>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="caption">{milestoneLabel}</Typography>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  milestone: PropTypes.string.isRequired,
};

Header.defaultProps = {};
