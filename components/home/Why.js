import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import SectionContent from './SectionContent';
import WhyItem from './WhyItem'

const contentItems = [
  {
    title: 'Build your job search plan',
    body: 'Build multiple job search plans to avoid getting stuck in the job search process. Whether newly unemployed or if you’ve been searching for a while, having a job search plan can keep you motivated.',
    imgPath: '/static/img/index/crane.svg',
  },
  {
    title: 'Act on your plan',
    body: 'Execute your job search plan with strategic tools and resources. Set your weekly and daily goals, and get tips on how to make progress! ',
    imgPath: '/static/img/index/career-search.svg',
  },
  {
    title: 'Get coaching',
    body: 'Join our online community of job seekers for peer and 1:1 coaching to help you navigate job searching with guided support, advice and more accountability.',
    imgPath: '/static/img/index/interviewing.svg',
  },
  {
    title: 'Build your network',
    body: 'Join online and in-person networking events and activities for various industries and occupations to stay fresh and connected.',
    imgPath: '/static/img/index/networking.svg',
  },
  {
    title: 'Stay on track',
    body: 'Get reminders when you set goals sent to your phone, email, or sync them with your calander, designed to help you suceed.',
    imgPath: '/static/img/index/buddies.svg',
  },
];

const styles = theme => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 1.5,
    },
  },
  gridItem: {
    '&$withSpecificity': {
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
      },
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing.unit * 1.25,
        paddingBottom: theme.spacing.unit * 1.25,
      },
    }
  },
  withSpecificity: { /* NOOP */ },
});

function Why(props) {
  const { classes } = props;
  const gridItemClassName = `${classes.gridItem} ${classes.withSpecificity}`;

  return (
    <Grid container justify="center" spacing={40} className={classes.root}>
      <Grid item sm md={6} className={gridItemClassName}>
        <SectionContent
          title="Why use the Career Network?"
          buttonText="Get started today"
          buttonColor="secondary"
        >
          Support to create and implement an effective job search plan emphasizing setting goals and high-priority and high-payoff activities.
        </SectionContent>
      </Grid>
      {
        contentItems.map((item, i) => (
          <Grid item key={i} sm={6} md={3} className={gridItemClassName}>
            <WhyItem {...item} />
          </Grid>
        ))
      }
    </Grid >
  );
}

export default withStyles(styles)(Why);
