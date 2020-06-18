import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  heading: {
    paddingTop: theme.spacing(2),
    color: theme.palette.background.dark,
  },
  content: {
    fontWeight: 'lighter',
    color: theme.palette.text.secondary,
    paddingTop: theme.spacing(2),
  },
  callToAction: {
    color: 'white',
    background: theme.palette.primary.main,
    width: '10vw',
    height: '4vh',
    marginTop: theme.spacing(2),
  },
  mainContainer: {
    height: '35rem',
    position: 'relative',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  img: {
    height: '470px',
    width: '470px',
  },
  imgContainer: {
    textAlign: 'center',
  },
  background: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '35rem',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
}));

const FeaturedItem = item => {
  const { imgType, img, heading, content, callToAction, link } = item;

  const classes = useStyles();

  return (
    <Grid
      container
      className={imgType === 'side' ? classes.mainContainer : classes.background}
      style={{ background: imgType === 'background' && `url(${img})`, backgroundSize: 'cover' }}
      alignItems="center"
      justify="center"
      spacing={10}
    >
      <Grid
        container
        item
        xs={12}
        sm={6}
        justify={imgType === 'side' ? 'flex-start' : 'center'}
        style={{ textAlign: imgType === 'side' ? 'left' : 'center' }}
      >
        <Grid item xs={12} sm={11}>
          <Typography className={classes.heading} variant="h3">
            {heading}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography className={classes.content} variant="body1">
            {content}
          </Typography>
          {callToAction && (
            <Button className={classes.callToAction} href={link}>
              {callToAction}
            </Button>
          )}
        </Grid>
      </Grid>
      {imgType === 'side' && (
        <Grid item xs={12} sm={6} className={classes.imgContainer}>
          <img src={img} alt={heading} className={classes.img} />
        </Grid>
      )}
    </Grid>
  );
};

export default FeaturedItem;
