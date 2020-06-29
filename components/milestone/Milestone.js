import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  section: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
  },
}));

export default function Milestone(props) {
  const classes = useStyles();
  const { milestone } = props;

  return (
    <div className={classes.root}>
      {JSON.stringify(milestone)}
      {/* <ActivityHeader
        categoryType={categoryType.slug}
        categoryLabel={categoryType.name}
        milestoneType={milestoneType.slug}
        milestoneLabel={milestoneType.name}
        title={title}
      /> */}
    </div>
  );
}

Milestone.propTypes = {
  milestone: PropTypes.objectOf(PropTypes.any).isRequired,
};

Milestone.defaultProps = {};
