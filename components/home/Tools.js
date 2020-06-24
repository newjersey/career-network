import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
  headingContainer: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.background.dark,
  },
  heading: {
    color: theme.palette.background.dark,
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.background.dark,
    textAlign: 'left',
  },
  content: {
    fontWeight: 'normal',
    color: theme.palette.grey['700'],
  },
  media: {
    height: theme.spacing(17.5),
    width: theme.spacing(17.5),
    margin: '0 auto 1.5vh',
  },
  divider: {
    margin: '5vh 45% 0',
    backgroundColor: theme.palette.background.dark,
  },
}));

const TOOL_CONTENT = [
  {
    title: 'Guided Activities',
    content:
      'Complete activities that offer expert tips and new skills that help set you up for job search success.',
    img: '/static/img/index/07_Superpowers/01_Icon-Activities-2x.png',
  },
  {
    title: 'Practice Exercise',
    content:
      'Put your knowledge to use by trying out what you’ve learned in our practice sections.',
    img: '/static/img/index/07_Superpowers/02_Icon-Exercise-2x.png',
  },
  {
    title: 'Personal Profile',
    content:
      'Build a private profile to see how your strengths and life experiences come together.',
    img: '/static/img/index/07_Superpowers/03_Icon-Profile-2x.png',
  },
  {
    title: 'Progress Tracking',
    content:
      'Track your progress by logging daily accomplishments, and see how you grow over time.',
    img: '/static/img/index/07_Superpowers/04_Icon-Progress-2x.png',
  },
  {
    title: 'Resource Access',
    content:
      'Find out about services - things like unemployment insurance - that could help while you look for work.',
    img: '/static/img/index/07_Superpowers/05_Icon-Resource-2x.png',
  },
  {
    title: 'Intelligent Suggestions',
    content:
      'Everyone’s job search looks different. Tell us what you need and we’ll make learn with you.',
    img: '/static/img/index/07_Superpowers/06_Icon-Intelligent-2x.png',
  },
];

function Tools() {
  const classes = useStyles();

  return (
    <ScaffoldContainer className={classes.root}>
      <Grid container justify="center" alignItems="center" spacing={10}>
        <Grid item md={9} className={classes.headingContainer}>
          <Typography variant="h1" className={classes.heading}>
            Our super power? Putting your super power to work.
          </Typography>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item md={10}>
          <Grid container item justify="center">
            {TOOL_CONTENT.map(item => (
              <Grid item key={item.title} xs={9} sm={6} md={4}>
                <Card>
                  <CardMedia className={classes.media} image={`${item.img}`} alt={item.title} />
                  <CardContent>
                    <Typography variant="body1" className={classes.title}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" component="p" className={classes.content}>
                      {item.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </ScaffoldContainer>
  );
}

export default Tools;
