import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Favorite from '@material-ui/icons/Favorite';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ScaffoldContainer from '../ScaffoldContainer';
import { logoItems } from './content/LOGO_CONTENT';

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
    color: '#0c4163',
  },
  headingContainer: {
    textAlign: 'center',
    paddingBottom: '4rem',
  },
  media: {
    height: 100,
    width: 100,
    margin: '0 auto',
  },
  mediaRect: {
    height: 60,
    width: 180,
    margin: '20px auto 20px',
  },
  icon: {
    fontSize: '3rem',
    color: '#0c4163',
    marginTop: '2rem',
  },
  cardContent: {
    color: '#2f2f34',
    textAlign: 'center',
    margin: '0 auto',
    width: '90%',
  },
  divider: {
    margin: '12vh 10% 0',
  },
}));

function Logos() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container justify="center" alignItems="flex-start" style={{ paddingTop: '6rem' }}>
          <Grid item xs={12} sm={12} className={classes.headingContainer}>
            <Typography variant="h4" className={classes.heading}>
              Powered by people who want to see
              <br /> you succeed
            </Typography>
            <Favorite className={classes.icon} />
          </Grid>

          {logoItems.map(item => (
            <Grid item key={item.name} xs={12} sm={2}>
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
        <Divider variant="middle" light="true" className={classes.divider} />
      </ScaffoldContainer>
    </div>
  );
}

export default Logos;
