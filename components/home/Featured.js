import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    paddingRight: theme.spacing(15),
    paddingLeft: theme.spacing(15),
  },
  img: {
    width: theme.spacing(50),
  },
  featuredItemTitle: {
    fontFamily: theme.typography.h2.fontFamily,
    fontSize: '3rem',
    color: theme.palette.background.dark,
    marginBottom: theme.spacing(3),
  },
  body: {
    fontSize: '1.25rem',
    width: theme.spacing(50),
    color: theme.palette.grey['700'],
  },
  featuredItemContainer: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(15),
  },
}));

const FEATURED_ITEMS = [
  {
    title: 'Find your way out of a job-search rut.',
    body:
      'If you’re repeating the same steps and not getting results, let us show you new techniques to best represent yourself and sell your experience.',
    image: '/static/img/index/03_Featured Callouts/01_Asset_Rut-2x.png',
    imageProps: {
      side: 'left',
    },
  },
  {
    title: 'Organize your search.',
    body:
      'It can be tough to organize your approach, but we can help you break down the chaotic job search into manageable steps.',
    image: '/static/img/index/03_Featured Callouts/02_Asset_Organized-2x.png',
    imageProps: {
      side: 'right',
    },
  },
  {
    title: 'Learn helpful coping skills.',
    body:
      'We get it. Searching for a job can be rough, especially in uncertain times. Check out our tips on learning skills that can help you manage stress.',
    image: '/static/img/index/03_Featured Callouts/03_Asset_Coping-2x.png',
    imageProps: {
      side: 'left',
    },
  },
];

const FeaturedItems = () => {
  const classes = useStyles();

  return (
    <ScaffoldContainer className={classes.root}>
      {FEATURED_ITEMS.map((item, index) => (
        <Grid
          container
          key={item.title}
          justify="space-between"
          alignItems="center"
          className={classes.featuredItemContainer}
          direction={index % 2 === 0 ? 'row' : 'row-reverse'}
        >
          <Grid item container xs={12} md={5} justify="center">
            <img src={item.image} alt={item.title} className={classes.img} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h1" className={classes.featuredItemTitle}>
              {item.title}
            </Typography>
            <Typography variant="body1" className={classes.body}>
              {item.body}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </ScaffoldContainer>
  );
};

export default FeaturedItems;
