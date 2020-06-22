import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ActivityHeader from './Header/ActivityHeader';
import Section from './Section';
import FirebasePropTypes from '../Firebase/PropTypes';
import { JOB_SEARCH_CATEGORIES, MILESTONE_TYPES } from '../../constants';

const useStyles = makeStyles(theme => ({
  section: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
  },
}));

export default function ActivityTemplate(props) {
  const classes = useStyles();
  const { activityTemplate, allPracticeQuestionInputs } = props;
  const { category, milestone, title, slug } = activityTemplate;
  const practiceData = activityTemplate.sections.find(sec => sec.slug === 'practice');
  const categoryType = JOB_SEARCH_CATEGORIES.find(cat => cat.slug === category);
  const milestoneType = MILESTONE_TYPES.find(ms => ms.slug === milestone);

  return (
    <div className={classes.root}>
      <ActivityHeader
        categoryType={categoryType.slug}
        categoryLabel={categoryType.name}
        milestoneType={milestoneType.slug}
        milestoneLabel={milestoneType.name}
        title={title}
      />
      <Section
        sectionData={practiceData}
        templateSlug={slug}
        allPracticeQuestionInputs={allPracticeQuestionInputs}
      />
    </div>
  );
}

ActivityTemplate.propTypes = {
  activityTemplate: PropTypes.objectOf(PropTypes.any).isRequired,
  allPracticeQuestionInputs: FirebasePropTypes.querySnapshot,
};

ActivityTemplate.defaultProps = {
  allPracticeQuestionInputs: [],
};
