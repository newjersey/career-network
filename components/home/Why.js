import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import SectionContent from './SectionContent';
import WhyItem from './WhyItem';

const contentItems = [
  {
    title: 'Build your job search plan',
    body: 'We use decades of experience to help you build a job search plan that will lead to meaningful results. Whether newly unemployed or you’ve been searching for a while, having a job search plan can keep you motivated and focused.',
    imgPath: '/static/img/index/build.svg',
  },
  {
    title: 'Act on your plan',
    body: 'Execute your job search plan with strategic tools and resources that have been selected for you. We will provide you with guidance to complete the steps that are used by top-performing candidates.',
    imgPath: '/static/img/index/career-search.svg',
  },
  {
    title: 'Coaching and support',
    body: 'Our digital coach is trained by real coaches with decades of experience.  We are also available to support you when you have a question.',
    imgPath: '/static/img/index/interviewing.svg',
  },
  {
    title: 'Build your network',
    body: 'Coming soon! Get recommendations to join online and in-person networking events and activities for various industries and occupations to stay fresh and connected.',
    imgPath: '/static/img/index/networking.svg',
  },
  {
    title: 'Stay on track',
    body: 'Coming soon! Get reminders sent to your phone or email to keep you informed and on track.',
    imgPath: '/static/img/index/buddies.svg',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1.5),
    },
  },
  gridItem: {
    '&$withSpecificity': {
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(1.25),
        paddingBottom: theme.spacing(1.25),
      },
    },
  },
  withSpecificity: { /* NOOP */ },
}));

function Why() {
  const classes = useStyles();
  const gridItemClassName = clsx(classes.gridItem, classes.withSpecificity);

  return (
    <Grid container justify="center" spacing={4} className={classes.root} id="why">
      <Grid item sm md={6} className={gridItemClassName}>
        <SectionContent
          title="Why use the Career Network?"
          buttonText="Get started today"
          buttonColor="secondary"
        >
          Find support to create and implement an effective job search plan.
        </SectionContent>
      </Grid>
      {
        contentItems.map(item => (
          <Grid item key={item.title} sm={6} md={3} className={gridItemClassName}>
            <WhyItem {...item} />
          </Grid>
        ))
      }
    </Grid>
  );
}

export default Why;
