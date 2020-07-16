import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React, { useState, useRef } from 'react';
import Typography from '@material-ui/core/Typography';

import { fullyLoaded } from '../../src/app-helper';
import { useAuth } from '../Auth';

import ScaffoldContainer from '../ScaffoldContainer';
import Section from '../activityTemplate/Section';
import FindingJob from './FindingJob';
import ApplyForJob from './ApplyForJob';
import Health from './Health';
import JobSearchShape from '../JobSearchShape';
import { FINDING_JOB, APPLYING_FOR_JOBS, TAKING_CARE } from '../../constants';

const useStyles = makeStyles(theme => ({
  navContainer: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
  },
  navText: {
    color: theme.palette.background.dark,
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: 600,
    lineHeight: '4.25rem',
  },
  shapeContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shape: {
    height: 'auto',
    width: '100%',
    maxWidth: theme.spacing(46),
  },
  hoverBlock: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
    borderLeftStyle: 'solid',
    borderLeftWidth: 2,
    borderLeftColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.grey['50'],
      borderRadius: theme.spacing(0, 1, 1, 0),
      borderLeftColor: theme.palette.background.dark,
    },
  },
}));

const calloutData = [
  {
    slug: 'dashboard-return',
    content: [
      {
        component: 'callout',
        variant: 'dashboard',
        content:
          'Start with 1 of the 3 Recommended Activities, on your dashboard. Remember, you can come back to this page at anytime and access all the activities via the milestones above.',
      },
    ],
  },
];

export default function JobSearchBasics() {
  const { user } = useAuth();
  const classes = useStyles();
  const [shape, setShowShape] = useState(FINDING_JOB);
  const findingJobSection = useRef(null);
  const applyForJobSection = useRef(null);
  const healthSection = useRef(null);

  const dashboardReturn = calloutData.find(sec => sec.slug === 'dashboard-return');

  const handleScrollTo = section => {
    const selectedSection = {
      [FINDING_JOB]: findingJobSection,
      [APPLYING_FOR_JOBS]: applyForJobSection,
      [TAKING_CARE]: healthSection,
    }[section];

    selectedSection.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div>
      <ScaffoldContainer>
        <Grid className={classes.navContainer} container justify="center">
          <Grid item xs={12} sm={5} className={classes.navText}>
            <Typography className={classes.title} component="h1" variant="h1">
              The Basics
              <br />
              of a Successful
              <br />
              Job Search
            </Typography>
            <Box
              className={classes.hoverBlock}
              onClick={() => handleScrollTo(FINDING_JOB)}
              onMouseLeave={() => setShowShape()}
              onMouseEnter={() => setShowShape(FINDING_JOB)}
            >
              <Typography variant="h6">Finding Job Opportunities</Typography>
              <Typography variant="body1">
                Expand your approach to finding jobs that match your needs and interests.
              </Typography>
            </Box>
            <Box
              className={classes.hoverBlock}
              onClick={() => handleScrollTo(APPLYING_FOR_JOBS)}
              onMouseLeave={() => setShowShape()}
              onMouseEnter={() => setShowShape(APPLYING_FOR_JOBS)}
            >
              <Typography variant="h6">Applying for Jobs</Typography>
              <Typography variant="body1">
                Stand out in today’s crowded job market by telling your story effectively.
              </Typography>
            </Box>
            <Box
              className={classes.hoverBlock}
              onClick={() => handleScrollTo(TAKING_CARE)}
              onMouseLeave={() => setShowShape()}
              onMouseEnter={() => setShowShape(TAKING_CARE)}
            >
              <Typography variant="h6">Taking Care of Yourself</Typography>
              <Typography variant="body1">
                To stay healthy and motivated — because there’s a whole lot more to you than what
                you do for work.
              </Typography>
            </Box>
          </Grid>
          <Grid item container xs={12} sm={5} justify="center">
            <div className={classes.shapeContainer}>
              {shape && <JobSearchShape jobSearchCategory={shape} className={classes.shape} />}
            </div>
          </Grid>
        </Grid>
      </ScaffoldContainer>
      <FindingJob scrollToRef={findingJobSection} />
      <ApplyForJob scrollToRef={applyForJobSection} />
      <Health scrollToRef={healthSection} />
      {fullyLoaded(user) && <Section sectionData={dashboardReturn} />}
    </div>
  );
}
