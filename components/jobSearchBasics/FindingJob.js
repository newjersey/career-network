import { makeStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ReportIcon from '@material-ui/icons/Report';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import ScaffoldContainer from '../ScaffoldContainer';
import { JOB_SEARCH_BASICS_TYPES } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
    backgroundColor: fade(JOB_SEARCH_BASICS_TYPES.search.color, 0.04),
  },
  title: {
    color: JOB_SEARCH_BASICS_TYPES.search.color,
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
    color: JOB_SEARCH_BASICS_TYPES.search.color,
    fontSize: '28px',
  },
}));

const MILESTONE_TYPES = [
  {
    value: 'professional-network',
    label: 'Professional Network',
    description:
      'Your professional network includes anyone who can speak to your good qualities and connect you with opportunities. We’ll show you how to develop this network into a powerful tool for job hunting.',
    icon: GroupAddIcon,
  },
  {
    value: 'research-skills',
    label: 'Research Skills',
    description:
      'These are the skills that allow you to get creative in how you find opportunities. We’ll give you tips on how to identify companies, people, and industry sources that can help your search.',
    icon: FindInPageIcon,
  },
  {
    value: 'list-wants',
    label: 'List of Your ‘Wants’ and ‘Must Haves’',
    description:
      'What you want and what you need may not always line up — especially if you’ve been out of work for a while. We have activities focused on helping you figure out if, where, and when to compromise.',
    icon: ReportIcon,
  },
];

const JOB_SEARCH_TOOLS = [
  {
    value: 'linkedIn-profile',
    label: 'LinkedIn Profile',
    description:
      'LinkedIn is social media for your work life. It has the features of an online resume, but it’s interactive and public. ',
    icon: LinkedInIcon,
  },
  {
    value: 'google-alerts',
    label: 'Google Alerts',
    description:
      'This service that will automatically update you when there’s new content you’re interested in. ',
    icon: NotificationImportantIcon,
  },
];

export default function FindingJob() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container justify="center">
          <Grid item container xs={12} sm={4}>
            <Typography className={classes.title} component="h1" variant="h3">
              Finding job
              <br />
              Opportunities
            </Typography>
          </Grid>
          <Grid item container xs={12} sm={6}>
            <Typography variant="body1">
              When you’re looking for jobs, it can be easy to get in the habit of doing the same
              things every day — whether it’s returning to the same online job boards or checking
              the same company websites. If that sounds like you, let’s shake things up a bit.
              <br />
              <br />
              There are lots of things you can do to broaden your view of the possibilities. And
              many of them may be more interesting than what you’re currently doing.
            </Typography>
            <Box mt={4}>
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
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Job Search Tools
              </Typography>
              <Typography variant="body1">
                Almost everyone has to look for a job at some point, and there’s a whole industry of
                tools to help. Here are a few of the ones we’ll introduce you to as you work towards
                milestones.
              </Typography>
              {JOB_SEARCH_TOOLS.map(tool => (
                <Box key={tool.value} className={classes.itemContainer}>
                  <tool.icon className={classes.iconContainer} />
                  <Box ml={3}>
                    <Typography className={classes.itemLabel} variant="h6" gutterBottom>
                      {tool.label}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {tool.description}
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
