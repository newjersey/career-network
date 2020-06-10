import { makeStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import ClassIcon from '@material-ui/icons/Class';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ScaffoldContainer from '../ScaffoldContainer';

import { JOB_SEARCH_BASICS_TYPES } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
    backgroundColor: fade(JOB_SEARCH_BASICS_TYPES.apply.color, 0.04),
  },
  title: {
    color: JOB_SEARCH_BASICS_TYPES.apply.color,
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
    padding: theme.spacing(1.5),
    width: '56px',
    height: '56px',
    background: 'white',
    boxShadow: '0 8px 12px 0 rgba(0, 0, 0, 0.04)',
    color: JOB_SEARCH_BASICS_TYPES.apply.color,
    fontSize: '28px',
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
    value: 'cover-letter',
    label: 'Cover Letter',
    description:
      'Many job postings require applicants to include a cover letter. This letter is your chance to tell the employer why you’re a great fit for the specific job and company.',
    icon: ClassIcon,
  },
  {
    value: 'references',
    label: 'References',
    description:
      'Before you’re hired, most companies will want to talk to people about your skills and relevant experience. Learn how to choose your references carefully.',
    icon: RecordVoiceOverIcon,
  },
  {
    value: 'resume',
    label: 'Resume',
    description:
      'This is a summary of your work history. It may include information about your awards, interests, and volunteer activities. ',
    icon: FileCopyIcon,
  },
  {
    value: 'interview-skills',
    label: 'Interview Skills',
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
            <Typography className={classes.title} component="h2" variant="h3">
              Applying for
              <br />
              Jobs
            </Typography>
          </Grid>
          <Grid item container xs={12} sm={6}>
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

ApplyForJob.propTypes = {
  scrollToRef: PropTypes.shape({
    current: PropTypes.object,
  }),
};

ApplyForJob.defaultProps = {
  scrollToRef: null,
};
