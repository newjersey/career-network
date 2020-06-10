import { makeStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import HighlightIcon from '@material-ui/icons/Highlight';
import HotTubIcon from '@material-ui/icons/HotTub';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ScaffoldContainer from '../ScaffoldContainer';
import { JOB_SEARCH_BASICS_TYPES } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
    backgroundColor: fade(JOB_SEARCH_BASICS_TYPES.health.color, 0.04),
  },
  title: {
    color: JOB_SEARCH_BASICS_TYPES.health.color,
    fontWeight: 500,
    fontSize: '2.5rem',
    lineHeight: '3.5rem',
    textAlign: 'right',
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  itemLabel: {
    color: theme.palette.background.dark,
    fontSize: '1rem',
    fontWeight: 500,
  },
  iconContainer: {
    borderRadius: '50%',
    padding: theme.spacing(1.7),
    width: '56px',
    height: '56px',
    background: 'white',
    boxShadow: '0 8px 12px 0 rgba(0, 0, 0, 0.04)',
    color: JOB_SEARCH_BASICS_TYPES.health.color,
  },
  topicIcon: {
    color: JOB_SEARCH_BASICS_TYPES.health.color,
    fontSize: '18px',
  },
}));

const TOPIC_TYPES = [
  {
    value: 'coping-strategies',
    label:
      'Various coping strategies, from getting physical activity to setting aside time with friends',
  },
  {
    value: 'develop-new-skill',
    label: 'Using your time to develop new skills',
  },
  {
    value: 'identify-values',
    label: 'How to identify your unique values and strengths and use them in your job search',
  },
  {
    value: 'volunteering',
    label: 'How volunteering could help you, even as you help others',
  },
];

const MILESTONE_TYPES = [
  {
    value: 'supportive-social-network',
    label: 'Supportive Social Network',
    description:
      'Positive relationships can help us feel optimistic and connected. And toxic ones can make hard times harder. We have tips on the give and take of supportive networks.',
    icon: FilterTiltShiftIcon,
  },
  {
    value: 'list-of-strengths',
    label: 'List of Strengths',
    description:
      'Taking the time to understand the specifics of what we have to offer the world can build confidence. ',
    icon: FitnessCenterIcon,
  },
  {
    value: 'personal-values',
    label: 'Personal Values',
    description:
      'What’s important to you and how does this affect choices in your day to day life? What does it mean for your job search? Let’s discuss.',
    icon: HighlightIcon,
  },
  {
    value: 'self-care-plan',
    label: 'Self-Care Plan',
    description:
      'We all experience stress differently, and what works for one person may not work for the next. We’ll help you find activities that are right for you.',
    icon: HotTubIcon,
  },
];

export default function Health() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container justify="center">
          <Grid item container xs={12} sm={4}>
            <Typography className={classes.title} component="h1" variant="h3">
              Taking Care
              <br />
              of Yourself
            </Typography>
          </Grid>
          <Grid item container xs={12} sm={6}>
            <Typography variant="body1">
              Sometimes, a job search can be exciting and inspiring. But if you’re out of work or
              feeling like your options are limited, a job search can be a time of uncertainty and
              stress.
              <br />
              <br />
              There’s a lot of research about how unemployment can affect mental and physical
              health. But there’s also a lot of research on what people can do to stay healthy, even
              during a time as stressful as being unemployed — or under-employed. <br />
              <br />
              We’ve created activities to support you as a whole person, and we’ll cover topics
              like:
            </Typography>
            {TOPIC_TYPES.map(topic => (
              <Box key={topic.value} className={classes.itemContainer}>
                <RadioButtonCheckedIcon className={classes.topicIcon} />
                <Box ml={2}>
                  <Typography variant="body1">{topic.label}</Typography>
                </Box>
              </Box>
            ))}

            <Box mt={8}>
              <Typography variant="h6" gutterBottom>
                Milestones to Measure Progress
              </Typography>
              <Typography variant="body1">
                One thing we’ve heard from job seekers is that it’s hard to feel like you’re making
                progress from one day to the next. That’s why we’ve included milestones to help you
                actually see your progress as you complete activities.
                <br />
                <br />
                If some of these milestones aren’t relevant for you, no problem. You choose where to
                start and what to skip.
              </Typography>
              {MILESTONE_TYPES.map(milestone => (
                <Box key={milestone.value} className={classes.itemContainer}>
                  <milestone.icon className={classes.iconContainer} />
                  <Box ml={3}>
                    <Typography className={classes.itemLabel} variant="h6" gutterBottom>
                      {milestone.label}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {milestone.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}
