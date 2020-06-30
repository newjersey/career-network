import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import MilestoneHeader from './MilestoneHeader';

const useStyles = makeStyles(theme => ({
  section: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
  },
}));

export default function Milestone(props) {
  const classes = useStyles();
  const { milestone } = props;
  const { category, title, goal } = milestone;

  return (
    <div className={classes.root}>
      <MilestoneHeader category={category} title={title} goal={goal} />
    </div>
  );
}

Milestone.propTypes = {
  milestone: PropTypes.objectOf(PropTypes.any).isRequired,
};

Milestone.defaultProps = {};
