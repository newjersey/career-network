import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import { useAuth } from '../Auth';
import ActivityHeader from './Header/ActivityHeader';
import ScaffoldContainer from '../ScaffoldContainer';
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
  nav: {
    border: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
    }`,
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    textTransform: 'none',
    marginRight: theme.spacing(5),
    padding: theme.spacing(2.5, 0),
    borderRadius: 0,
    fontSize: '1rem',
    '&:hover': {
      fontWeight: 600,
      backgroundColor: 'white',
      color: theme.palette.background.dark,
      borderBottom: `2px solid ${theme.palette.navy.primary}`,
    },
  },
}));

const SECTIONS = {
  WHAT_AND_WHY: {
    value: 'whatAndWhy',
    label: 'What and Why?',
  },
  TIPS_FOR_SUCCESS: {
    value: 'tipsForSuccess',
    label: 'Tips for Success',
  },
  EXAMPLES: {
    value: 'examples',
    label: 'Examples',
  },
  PRACTICE: {
    value: 'practice',
    label: 'Practice',
  },
};

export default function ActivityTemplate(props) {
  const classes = useStyles();
  const { userDocRef } = useAuth();
  const { activityTemplate, allPracticeQuestionInputs } = props;
  const { category, milestone, title, slug } = activityTemplate;
  const practiceData = activityTemplate.sections.find(sec => sec.slug === 'practice');
  const whatAndWhy = activityTemplate.sections.find(sec => sec.slug === 'what-and-why');
  const tipsForSuccess = activityTemplate.sections.find(sec => sec.slug === 'tips-for-success');
  const citations = activityTemplate.sections.find(sec => sec.slug === 'citations');
  const examples = activityTemplate.sections.find(sec => sec.slug === 'examples');
  const nextSteps = activityTemplate.sections.find(sec => sec.slug === 'next-steps');
  const categoryType = JOB_SEARCH_CATEGORIES.find(cat => cat.slug === category);
  const milestoneType = MILESTONE_TYPES.find(ms => ms.slug === milestone);

  const whatAndWhySection = useRef(null);
  const tipsForSuccessSection = useRef(null);
  const examplesSection = useRef(null);
  const practiceSection = useRef(null);

  const handleScrollTo = section => {
    const sectionRef = {
      [SECTIONS.WHAT_AND_WHY.value]: whatAndWhySection,
      [SECTIONS.TIPS_FOR_SUCCESS.value]: tipsForSuccessSection,
      [SECTIONS.EXAMPLES.value]: examplesSection,
      [SECTIONS.PRACTICE.value]: practiceSection,
    }[section];

    sectionRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleComplete = () => {
    const activityData = {
      createdTime: new Date(),
      fields: {
        Category: category,
        Task: title,
        Title: title,
        milestone,
        Why: whatAndWhy.content[0].content,
      },
      id: slug,
    };

    const data = {
      taskId: slug,
      timestamp: new Date(),
      type: 'done',
      task: activityData,
    };

    userDocRef.collection('taskDispositionEvents').add(data);

    const weeklyStats = {
      goals: firebase.firestore.FieldValue.increment(1),
      tasksTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    userDocRef.set({ weeklyStats }, { merge: true });
  };

  return (
    <div className={classes.root}>
      <ActivityHeader
        categoryType={categoryType.slug}
        categoryLabel={categoryType.name}
        milestoneType={milestoneType.slug}
        milestoneLabel={milestoneType.name}
        title={title}
      />
      <Box className={classes.nav}>
        <ScaffoldContainer>
          {Object.keys(SECTIONS)
            .filter(sectionKey => sectionKey !== 'EXAMPLES' || examples)
            .map(sectionKey => (
              <Button
                className={classes.button}
                onClick={() => handleScrollTo(SECTIONS[sectionKey].value)}
              >
                {SECTIONS[sectionKey].label}
              </Button>
            ))}
        </ScaffoldContainer>
      </Box>
      <Section sectionData={whatAndWhy} scrollToRef={whatAndWhySection} />
      <Section sectionData={tipsForSuccess} scrollToRef={tipsForSuccessSection} />
      {examples && <Section sectionData={examples} scrollToRef={examplesSection} />}
      <Section
        sectionData={practiceData}
        templateSlug={slug}
        backgroundColor={fade(JOB_SEARCH_CATEGORY_COLORS[category], 0.07)}
        allPracticeQuestionInputs={allPracticeQuestionInputs}
        scrollToRef={practiceSection}
      />
      <Section
        sectionData={nextSteps}
        onComplete={() => handleComplete()}
        backgroundColor="#f5fafe"
      />
      <Section sectionData={citations} />
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
