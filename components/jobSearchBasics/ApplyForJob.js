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
import ClassIcon from '@material-ui/icons/Class';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ScaffoldContainer from '../ScaffoldContainer';
import SectionHeader from './SectionHeader';

import { JOB_SEARCH_BASICS_TYPES } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
    backgroundColor: fade(JOB_SEARCH_BASICS_TYPES.apply.color, 0.04),
  },
  title: {
    color: JOB_SEARCH_BASICS_TYPES.apply.color,
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
    color: JOB_SEARCH_BASICS_TYPES.apply.color,
  },
  topicIcon: {
    color: JOB_SEARCH_BASICS_TYPES.apply.color,
    fontSize: '18px',
  },
}));

const TOPIC_TYPES = [
  {
    value: 'write-resume',
    label: 'How to write a resume that’s more likely to get through an automated screening process',
  },
  {
    value: 'tailor-application',
    label: 'How to tailor your application to each job posting',
  },
  {
    value: 'interview',
    label:
      'What to ask during an interview (because they’re not just interviewing you — you’re interviewing them, too)',
  },
  {
    value: 'recruiter',
    label: 'The things recruiters look for',
  },
];

const MILESTONE_TYPES = [
  {
    value: 'supporting-information',
    label: 'Supporting Information',
    milestoneLink: `/milestones/supporting-information`,
    description:
      'Many job postings require applicants to provide more than just your work history. Supporting information could include a cover letter, list of references, or even a portfolio, depending on the role',
    icon: ClassIcon,
  },
  {
    value: 'resume',
    label: 'Resume',
    milestoneLink: `/milestones/resume`,
    description:
      'This is a summary of your work history. It may include information about your awards, interests, and volunteer activities. ',
    icon: FileCopyIcon,
  },
  {
    value: 'interviewing-skills',
    label: 'Interviewing Skills',
    milestoneLink: `/milestones/interviewing-skills`,
    description:
      'Interviews can be intimidating, especially if you haven’t had many or are out of practice. We’ll help you prep for everything from a phone screen to a video interview. ',
    icon: PhoneInTalkIcon,
  },
];

export default function ApplyForJob({ scrollToRef }) {
  const classes = useStyles();

  return (
    <div className={classes.root} ref={scrollToRef}>
      <ScaffoldContainer>
        <Grid container justify="center">
          <Grid item container xs={12} sm={4}>
            <Typography className={classes.title} variant="h2">
              Applying for
              <br />
              Jobs
            </Typography>
          </Grid>
          <Grid item container xs={12} sm={6}>
            <Box mb={2}>
              <Typography variant="h5">
                Stand out in the job market by telling your story effectively.
              </Typography>
            </Box>
            <Typography variant="body1">
              The exact steps you take to apply for a job will be different depending on the type of
              job you’re applying for. But there are some tips and tricks that will help in just
              about evey case.
              <br />
              <br />
              We have a range of activities to help you land a job that meets your needs, and we’ll
              cover topics like:
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

ApplyForJob.propTypes = {
  scrollToRef: PropTypes.shape({
    current: PropTypes.object,
  }),
};

ApplyForJob.defaultProps = {
  scrollToRef: null,
};
