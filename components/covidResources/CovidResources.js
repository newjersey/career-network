import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../ScaffoldContainer';
import BackgroundHeader from '../BackgroundHeader';
import ResourceCard from './ResourceCard';

const useStyles = makeStyles(theme => ({
  backgroundHeader: {
    background: `linear-gradient(to right, #ffffff, #60b1e9 100%)`,
  },
  section: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(4),
  },
}));

const resources = [
  {
    value: 'information-hub',
    title: 'COVID-19 Information Hub',
    description: `Do you have any questions about COVID-19 and the current services available to NJ residents? Visit 
        the NJ COVID-19 Information Hub for 
        all the latest details.`,
    link: 'https://covid19.nj.gov/',
  },
  {
    value: 'work-nj',
    title: 'Work NJ - Helpful Resources',
    description: `The Work NJ Hub will help connect to benefits and resources you need while you are trying to safely get back to work, as well as some tips for coping with the stress of losing a job.`,
    link: 'https://covid19.nj.gov/work',
  },
  {
    value: 'job-portal',
    title: 'COVID-19 Job Portal',
    description: `Have you lost your job or have your hours reduced as a result of COVID-19? Visit the
        COVID-19 Jobs Portal.`,
    link: 'https://jobs.covid19.nj.gov/',
  },
];
export default function CovidResources() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BackgroundHeader className={classes.backgroundHeader}>
        <ScaffoldContainer className={classes.header}>
          <Grid container justify="center">
            <Grid item xs={12} sm={7}>
              <Typography variant="h5">COVID-19 Resources and Services</Typography>
            </Grid>
          </Grid>
        </ScaffoldContainer>
      </BackgroundHeader>

      <ScaffoldContainer>
        <Grid className={classes.section} container justify="center">
          <Grid item xs={12} sm={7}>
            <Typography variant="body1">
              On behalf of everyone at New Jersey Career Network, we want to acknowledge that it has
              been an extraordinary few months of historic challenges with the COVID-19 pandemic.
              <br />
              <br />
              During this time of great uncertainty, it is vital that we stay informed and
              connected, even as we practice social distancing and prioritize keeping each other
              safe and healthy.
              <br />
              <br />
              We are here to support you with the latest information and up-to-date resources to
              support you and your job search during this difficult time. Thank You!
            </Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid
            className={classes.section}
            container
            item
            direction="row"
            spacing={2}
            xs={12}
            sm={7}
          >
            {resources.map(resource => (
              <Grid item xs={12} sm={12} md={6} key={resource.value}>
                <ResourceCard {...resource} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}
