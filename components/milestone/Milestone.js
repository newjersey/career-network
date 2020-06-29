import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ActivitiesSection from './ActivitiesSection';

const useStyles = makeStyles(theme => ({
  section: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
  },
}));

export default function Milestone(props) {
  const classes = useStyles();
  const { milestone, activityTemplates } = props;
  const activitiesSection = milestone.sections.find(section => section.slug === 'activities');
  return (
    <div className={classes.root}>
      <ActivitiesSection sectionData={activitiesSection} activityTemplates={activityTemplates} />
    </div>
  );
}

Milestone.propTypes = {
  milestone: PropTypes.objectOf(PropTypes.any).isRequired,
  activityTemplates: PropTypes.arrayOf(PropTypes.any),
};

Milestone.defaultProps = {
  activityTemplates: [],
};
