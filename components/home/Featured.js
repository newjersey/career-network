import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ScaffoldContainer from '../ScaffoldContainer';

const tempImg = '/static/img/index/placeholder.png';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  featuredImage: {
    width: 466,
    height: 'auto',
  },
  featuredItemTitle: {
    color: theme.palette.background.dark,
    marginBottom: theme.spacing(3),
  },
  featuredItemBody: {
    color: theme.palette.grey['700'],
  },
  featuredItemContainer: {
    marginTop: 90,
    marginBottom: 90,
  },
}));

const FEATURED_ITEMS = [
  {
    title: 'Find your way out of a job-search rut.',
    body:
      'If you’re repeating the same steps and not getting results, let us show you new techniques to best represent yourself and sell your experience.',
    image: tempImg,
    imageProps: {
      side: 'left',
    },
  },
  {
    title: 'Organize your search.',
    body:
      'It can be tough to organize your approach, but we can help you break down the chaotic job search into manageable steps.',
    image: tempImg,
    imageProps: {
      side: 'right',
    },
  },
  {
    title: 'Learn helpful coping skills.',
    body:
      'We get it. Searching for a job can be rough, especially in uncertain times. Check out our tips on learning skills that can help you manage stress.',
    image: tempImg,
    imageProps: {
      side: 'left',
    },
  },
];

function Featured() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        {FEATURED_ITEMS.map((item, index) => (
          <Grid
            container
            key={item.title}
            justify="space-between"
            className={classes.featuredItemContainer}
            direction={index % 2 === 0 ? 'row' : 'row-reverse'}
          >
            <Grid item container md={6} justify="center">
              <img src={item.image} alt="featured-item-pic" className={classes.featuredImage} />
            </Grid>
            <Grid item md={5}>
              <Typography variant="h1" className={classes.featuredItemTitle}>
                {item.title}
              </Typography>
              <Typography variant="body1" className={classes.featuredItemBody}>
                {item.body}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </ScaffoldContainer>
    </div>
  );
}

export default Featured;
