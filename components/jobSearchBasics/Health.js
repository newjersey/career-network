import { makeStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Flags } from 'react-feature-flags';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import NextLink from 'next/link';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import HighlightIcon from '@material-ui/icons/Highlight';
import HotTubIcon from '@material-ui/icons/HotTub';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ScaffoldContainer from '../ScaffoldContainer';
import SectionHeader from './SectionHeader';
import { JOB_SEARCH_BASICS_TYPES } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
    backgroundColor: fade(JOB_SEARCH_BASICS_TYPES.health.color, 0.04),
  },
  title: {
    color: JOB_SEARCH_BASICS_TYPES.health.color,
    fontWeight: 600,
    fontSize: '2.5rem',
    lineHeight: '3.5rem',
    textAlign: 'right',
  },
  itemContainer: {
    display: 'flex',
    marginTop: theme.spacing(4),
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
  link: {
    fontWeight: 700,
    color: theme.palette.text.secondary,
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
    value: 'strenths-and-values',
    label: 'Strengths and Values',
    milestoneLink: `/milestones/strenths-and-values`,
    description:
      'Taking the time to understand the specifics of what we have to offer the world can build confidence. What’s important to you? How does this affect your job search? Let’s explore.',
    icon: FitnessCenterIcon,
  },
  {
    value: 'staying-motivated',
    label: 'Staying Motivated',
    milestoneLink: `/milestones/staying-motivated`,
    description:
      'Finding the right job for you can take time. We’ll give you tips for staying motivated, even when the going gets tough.',
    icon: HighlightIcon,
  },
  {
    value: 'stress-management-practices',
    label: 'Stress Management Practices',
    milestoneLink: `/milestones/stress-management-practices`,
    description:
      'We all experience stress differently, and what works for one person may not work for the next. We’ll help you find activities that are right for you.',
    icon: HotTubIcon,
  },
];

export default function Health({ scrollToRef }) {
  const classes = useStyles();

  return (
    <div className={classes.root} ref={scrollToRef}>
      <ScaffoldContainer>
        <Grid container justify="center">
          <Grid item container xs={12} sm={4}>
            <Typography className={classes.title} variant="h2">
              Taking Care
              <br />
              of Yourself
            </Typography>
          </Grid>
          <Grid item container xs={12} sm={6}>
            <Box mb={2}>
              <Typography variant="h5">
                To stay healthy and motivated — because there’s a whole lot more to you than what
                you do for work.
              </Typography>
            </Box>
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

            <Box mt={10}>
              <SectionHeader gutterBottom>Milestones to Measure Progress</SectionHeader>
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
                    <Typography variant="h5" gutterBottom>
                      {milestone.label}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {milestone.description}
                    </Typography>
                    <Flags authorizedFlags={['milestonePages']}>
                      {milestone.milestoneLink && (
                        <NextLink href="/milestones/[milestone]" as={milestone.milestoneLink}>
                          <Button className={classes.link}>Learn more</Button>
                        </NextLink>
                      )}
                    </Flags>
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

Health.propTypes = {
  scrollToRef: PropTypes.shape({
    current: PropTypes.object,
  }),
};

Health.defaultProps = {
  scrollToRef: null,
};
