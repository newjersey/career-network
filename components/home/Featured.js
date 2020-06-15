import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  heading: {
    fontWeight: 'bold',
    paddingTop: '2rem',
    color: '#598fe0',
  },
  content: {
    fontWeight: 'lighter',
    color: '#598fe0',
    paddingTop: '1.2rem',
  },
  callToAction: {
    color: 'white',
    background: '#598fe0',
    width: '10vw',
    height: '4vh',
    marginTop: '2.5rem',
  },
  itemContainer: {
    textAlign: 'left',
    '&:last-of-type': {
      textAlign: 'center',
    },
  },
  imageContainer: {
    textAlign: 'left',
  },
  mainContainer: {
    '&:nth-of-type(2)': {
      flexDirection: 'row-reverse',
    },
    '&:nth-of-type(2n+3)': {
      flexDirection: 'row-reverse',
    },
    paddingBottom: '2rem',
    '&:nth-of-type(1)': {
      height: '35rem',
      paddingBottom: '3rem',
    },
    '&:last-of-type': {
      height: '30rem',
    },
  },
}));

function Featured(props) {
  const { featuredContent } = props;

  const classes = useStyles();

  const headingSize = (img, length) => {
    if (img) {
      if (length > 36) return 12;
      return 9;
    }
    return 12;
  };

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        {featuredContent.map(item => (
          <Grid key={item.heading} container alignItems="center" className={classes.mainContainer}>
            <Grid
              container
              direction="column"
              item
              xs={12}
              sm={item.img ? 6 : 12}
              className={classes.itemContainer}
            >
              <Grid item xs={12} sm={headingSize(item.img, item.heading.length)}>
                <Typography variant="h3" className={classes.heading}>
                  {item.heading}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={item.img ? 8 : 12}>
                <Typography variant="body1" className={classes.content}>
                  {item.content}
                </Typography>
                {item.callToAction && (
                  <Button className={classes.callToAction} href={item.link}>
                    {item.callToAction}
                  </Button>
                )}
              </Grid>
            </Grid>

            {item.img && (
              <Grid item xs={12} sm={6} className={classes.imageContainer}>
                <img width="80%" src={`${item.img}`} alt={item.heading} />
              </Grid>
            )}
          </Grid>
        ))}
      </ScaffoldContainer>
    </div>
  );
}

Featured.propTypes = {
  featuredContent: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Featured;
