import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import Picture from '../components/Picture';
import ScaffoldContainer from '../components/ScaffoldContainer';
import withTitle from '../components/withTitle';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  body1: {
    paddingTop: theme.spacing(2),
  },
  subtitle: {
    color: theme.palette.text.hint,
  },
  image: {
    maxHeight: 140,
  },
  images: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(3),
  },
}));

function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography variant="h3" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h5" component="p" gutterBottom className={classes.subtitle}>
          Who we are and what we do
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={4}
          className={classes.images}
        >
          <Grid item>
            <Picture
              path="nj-lwd.webp"
              fallbackType="png"
              className={classes.image}
              alt="New Jersey Department of Labor and Workforce Development Logo"
              style={{ borderRadius: '50%' }}
            />
            <Typography variant="caption" component="p" align="center">
              NJ Department of Labor
            </Typography>
          </Grid>
          <Grid item>
            <Picture
              path="rutgers.webp"
              fallbackType="png"
              className={classes.image}
              alt="Rutgers University"
            />
          </Grid>
          <Grid item>
            <Picture
              path="nj-seal.webp"
              fallbackType="png"
              className={classes.image}
              alt="New Jersey State Seal"
            />
            <Typography variant="caption" component="p" align="center">
              NJ Office of Innovation
            </Typography>
          </Grid>
        </Grid>
        <Typography className={classes.body1}>
          The New Jersey Career Network (NJCN) is a new online platform designed to help you
          navigate and succeed in the job search process. NJCN is being designed by the Heldrich
          Center for Workforce Development at Rutgers University and the New Jersey Office of
          Innovation in partnership with the New Jersey Department of Labor and Workforce
          Development.
        </Typography>
        <Typography className={classes.body1}>
          Whether you are just starting out or have been searching for a while, this platform will
          provide you with useful guidance catered to your specific job search needs. Think of it as
          a “digital coach,” asking you questions about your search and then making customized
          recommendations about your next steps, helping you stay focused on the right activities so
          you can create effective job search routines that lead to results.
        </Typography>
        <Typography component="div" className={classes.body1}>
          Key features include:
          <ul>
            <li>
              Help in creating and quality-checking the essential job search items that every job
              seeker needs.
            </li>
            <li>
              Expert guidance and daily agendas that keep you focused on the right activities for
              your search every day.
            </li>
            <li>
              Curated resources and quality checks to help you complete key tasks and activities in
              your search.{' '}
            </li>
            <li>
              Assistance in preparing for key job search events, such as phone screens, in-person
              interviews, job fairs and networking events.
            </li>
            <li>
              A real-time “job search health check-up” that will show you how you’re spending your
              time and where you may want to make some changes.
            </li>
            <li>
              Ongoing assessment questions so our expert system can provide you with additional
              customized recommendations.
            </li>
            <li>24/7 accessibility from any device.</li>
          </ul>
        </Typography>
        <Typography>
          As you work through your daily activities and report on your progress, our expert system
          gets smarter about you and your search and will provide more tailored action steps based
          on what’s working for you. Over time, you will be able to learn which activities and tasks
          are giving you the best outcomes in the process and can discover how to improve the job
          search experience and process for yourself, both in terms of activities, as well as how to
          support your mood and motivation during the search.
        </Typography>
        <Typography className={classes.body1}>
          Job search is hard. Let the New Jersey Career Network help you learn what works for you
          and implement effective job search routines that will lead to your next opportunity.
        </Typography>
      </ScaffoldContainer>
    </div>
  );
}

export default withTitle(About, 'About');
