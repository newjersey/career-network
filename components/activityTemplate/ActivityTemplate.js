import React from 'react';
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import ActivityHeader from './Header/ActivityHeader';
import Section from './Section';
import {
  JOB_SEARCH_CATEGORIES,
  MILESTONE_TYPES,
  JOB_SEARCH_CATEGORY_COLORS,
} from '../../constants';
import FirebasePropTypes from '../Firebase/PropTypes';

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
  const whatAndWhy = activityTemplate.sections.find(sec => sec.slug === 'what-and-why');
  const tipsForSuccess = activityTemplate.sections.find(sec => sec.slug === 'tips-for-success');
  const examples = activityTemplate.sections.find(sec => sec.slug === 'examples');
  const nextSteps = activityTemplate.sections.find(sec => sec.slug === 'next-steps');
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
      <Section sectionData={whatAndWhy} />
      <Section sectionData={tipsForSuccess} />
      {examples && <Section sectionData={examples} />}
      <Section
        sectionData={practiceData}
        templateSlug={slug}
        backgroundColor={fade(JOB_SEARCH_CATEGORY_COLORS[category], 0.07)}
        allPracticeQuestionInputs={allPracticeQuestionInputs}
      />
      <Section sectionData={nextSteps} backgroundColor="#f5fafe" />
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
