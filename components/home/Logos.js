import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  },
  logosContainer: {
    margin: theme.spacing(2),
  },
  heading: {
    color: theme.palette.background.dark,
    textAlign: 'center',
    marginRight: theme.spacing(45),
    marginLeft: theme.spacing(45),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(5),
      marginLeft: theme.spacing(5),
    },
  },
  icon: {
    fontSize: theme.spacing(6),
    color: theme.palette.background.dark,
    margin: '3rem 0 2rem',
  },
  logoImg: {
    width: '80%',
    height: '80%',
  },
  logoName: {
    color: theme.palette.grey['800'],
    textAlign: 'center',
    width: theme.spacing(15),
    lineHeight: '0.5',
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginRight: '10%',
    marginLeft: '10%',
    color: theme.palette.grey['300'],
  },
}));

const LOGO_CONTENT = [
  {
    name: 'New Jersey Department of Labor',
    img: '/static/img/index/05_Logos/DOL-2x.png',
  },
  {
    name: `Heldrich Center for Workforce Development at Rutgers University`,
    img: '/static/img/index/05_Logos/Rutgers-2x.png',
  },
  {
    name: 'New Jersey Office of Innovation',
    img: '/static/img/index/05_Logos/NJ-CIO-2x.png',
  },
  {
    name: 'New America',
    img: '/static/img/index/05_Logos/New-America-2x.png',
  },
  {
    name: 'Lumina Foundation',
    img: '/static/img/index/05_Logos/Lumina-2x.png',
  },
];

function Logos() {
  const classes = useStyles();

  return (
    <div>
      <Grid container justify="center" alignItems="flex-start" className={classes.mainContainer}>
        <Grid container item md={12} justify="center">
          <Typography variant="h1" className={classes.heading}>
            Powered by people who want to see you succeed.
            <br />
            <Favorite className={classes.icon} />
          </Typography>
        </Grid>
        {LOGO_CONTENT.map(item => (
          <Grid
            item
            container
            xs={5}
            md={2}
            direction="column"
            justify="flex-start"
            alignItems="center"
            key={item.name}
            className={classes.logosContainer}
          >
            <Grid item container sm={9} md={12} justify="center">
              <img className={classes.logoImg} src={`${item.img}`} alt={item.name} />
            </Grid>
            <Grid
              item
              md={12}
              className={classes.logoName}
              style={{ width: item.name.length > 60 && '80%' }}
            >
              <Typography variant="caption">{item.name}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Divider variant="middle" className={classes.divider} />
    </div>
  );
}

export default Logos;
