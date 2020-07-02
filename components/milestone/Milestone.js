import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ActivitiesSection from './ActivitiesSection';
import Section from '../activityTemplate/Section';
import ExploreSection from './Explore/ExploreSection';

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
  const overviewSection = milestone.sections.find(section => section.slug === 'milestone');
  const exploreSection = milestone.sections.find(section => section.slug === 'more-milestones');
  return (
    <div className={classes.root}>
      <Section sectionData={overviewSection} />
      <ActivitiesSection sectionData={activitiesSection} activityTemplates={activityTemplates} />
      <ExploreSection sectionData={exploreSection} category={milestone.category} />
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
