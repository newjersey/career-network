import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import NetworkItem from './NetworkItem';
import SectionContent from './SectionContent';

const items = [
  {
    title: 'Jersey City',
    imgPath: 'https://28nwgk2wx3p52fe6o9419sg5-wpengine.netdna-ssl.com/wp-content/uploads/2017/12/jersey-city-hoboken-real-estate-market-report-q4-2016.jpg',
    listItems: [
      'Mix and Mingle',
      'Technology',
    ],
  },
  {
    title: 'Trenton',
    imgPath: 'https://townsquare.media/site/385/files/2017/05/Trenton-Makes-Bridge-at-Twilight-Josh-Friedman-April-2017-Horizontal-low-res-1.jpg',
    listItems: [
      'Convention',
      'Retail',
    ],
  },
  {
    title: 'Hoboken',
    imgPath: 'https://render.fineartamerica.com/images/rendered/default/greeting-card/images-medium-5/erie-lackawanna-susan-candelario.jpg?&targetx=0&targety=-11&imagewidth=700&imageheight=523&modelwidth=700&modelheight=500&backgroundcolor=0F0D10&orientation=0',
    listItems: [
      'Meetup',
      'Accounting Life Sciences',
    ],
  },
  {
    title: 'New Brunswick',
    imgPath: 'https://t-ec.bstatic.com/images/hotel/max1024x768/161/161468277.jpg',
    listItems: [
      'Portfolio Review',
      'Consulting',
    ],
  },
  {
    title: 'Newark',
    imgPath: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_825,q_50,w_1900/v1/clients/newark-redesign/Newark_HouseAd_HI_012819_13686cbf-10f3-4434-8f31-60400a19ec58.jpg',
    listItems: [
      'Meetup',
      'Health Care',
    ],
  },
  {
    title: 'Princeton',
    imgPath: 'https://girshdevelopment.com/newtonconstruction/wp-content/uploads/2015/06/Princeton-NJ-New-Homes.jpg',
    listItems: [
      'Webcast',
      'Design',
    ],
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
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

function Network() {
  const classes = useStyles();
  const gridItemClassName = clsx(classes.gridItem, classes.withSpecificity);

  return (
    <div className={classes.root}>
      <SectionContent title="Build your network">
        Develop a strong and active professional network to keep your skill set
        fresh, stay up-to-date on the latest trends in your occupation/industry,
        and learn about tools and resources that will foster your professional
        development. Networking is a critical component on today’s job search and
        can open doors to new career opportunities. Learn how to build professional
        relationships online and in-person.
      </SectionContent>

      <Grid container spacing={4}>
        {items.map(item => (
          <Grid item key={item.title} xs={12} sm={6} md={4} className={gridItemClassName}>
            <NetworkItem {...item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Network;
