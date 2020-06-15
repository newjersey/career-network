import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Favorite from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    '& .MuiCardMedia-root': {
      backgroundSize: 'contain',
    },
  },
  heading: {
    fontWeight: 'bold',
    color: '#598fe0',
  },
  headingContainer: {
    textAlign: 'center',
    paddingBottom: '4rem',
  },
  media: {
    height: 140,
    width: 140,
    margin: '0 auto',
  },
  mediaRect: {
    height: 100,
    width: 280,
    margin: '0 auto',
  },
  icon: {
    fontSize: '3rem',
    color: '#598fe0',
    marginTop: '2rem',
  },
  cardContent: {
    color: '#598fe0',
    textAlign: 'center',
    margin: '0 auto',
    maxWidth: 250,
  },
}));

function Logos(props) {
  const { logoContent } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container justify="center" alignItems="flex-end" style={{ paddingTop: '6rem' }}>
          <Grid item xs={12} sm={12} className={classes.headingContainer}>
            <Typography variant="h3" className={classes.heading}>
              Powered by people who want to see you succeed
            </Typography>
            <Favorite className={classes.icon} />
          </Grid>

          {logoContent.map(item => (
            <Grid item key={item.name} xs={12} sm={4}>
              <Card>
                <CardMedia
                  className={item.type === 'rectangle' ? classes.mediaRect : classes.media}
                  image={`${item.img}`}
                  alt={item.name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="caption">{item.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

Logos.propTypes = {
  logoContent: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Logos;
