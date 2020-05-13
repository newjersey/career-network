import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import BackgroundHeader from '../BackgroundHeader';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  intro: {
    color: theme.palette.background.dark,
    fontSize: '1rem',
  },
}));

function Goal({ goal }) {
  const classes = useStyles();

  return (
    <>
      <BackgroundHeader>
        <ScaffoldContainer>
          <Grid container justify="center">
            <Grid item xs={12} md={9}>
              <Typography className={classes.intro} variant="h6" gutterBottom>
                My Career Goal is ...
              </Typography>
              <Typography variant="h6" style={{ fontSize: '1.5rem', lineHeight: '2rem' }}>
                {goal}
              </Typography>
            </Grid>
          </Grid>
        </ScaffoldContainer>
      </BackgroundHeader>
    </>
  );
}

Goal.propTypes = {
  goal: PropTypes.string.isRequired,
};

export default Goal;
