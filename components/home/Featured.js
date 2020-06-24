import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    paddingRight: theme.spacing(15),
    paddingLeft: theme.spacing(15),
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
  },
  img: {
    width: theme.spacing(60),
    height: '100%',
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  heading: {
    color: theme.palette.background.dark,
    marginBottom: theme.spacing(3),
  },
  body: {
    width: theme.spacing(50),
    color: theme.palette.grey['700'],
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
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
  },
  {
    title: 'Keep your search organized.',
    body:
      'It can be tough to organize your approach, but we can help you break down the chaotic job search into manageable steps.',
    image: '/static/img/index/03_Featured Callouts/02_Asset_Organized-2x.png',
  },
  {
    title: 'Learn helpful coping skills.',
    body:
      'We get it. Searching for a job can be rough, especially in uncertain times. Check out our tips on learning skills that can help you manage stress.',
    image: '/static/img/index/03_Featured Callouts/03_Asset_Coping-2x.png',
  },
];

const FeaturedItems = () => {
  const classes = useStyles();

  return (
    <ScaffoldContainer className={classes.mainContainer}>
      {FEATURED_ITEMS.map((item, index) => (
        <Grid
          container
          key={item.title}
          justify="space-between"
          alignItems="center"
          className={classes.featuredItemContainer}
          direction={index % 2 === 0 ? 'row-reverse' : 'row'}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h1" className={classes.heading}>
              {item.title}
            </Typography>
            <Typography variant="body1" className={classes.body}>
              {item.body}
            </Typography>
          </Grid>
          <Grid item container xs={12} md={4} justify="center">
            <img src={item.image} alt={item.title} className={classes.img} />
          </Grid>
        </Grid>
      ))}
    </ScaffoldContainer>
  );
};

export default FeaturedItems;
