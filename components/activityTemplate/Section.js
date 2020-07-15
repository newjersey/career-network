import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../ScaffoldContainer';
import SectionComponent from './SectionComponent';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    backgroundColor: props => props.backgroundColor || theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(5, 2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.dark,
  },
}));
function Section({ sectionData, onComplete, scrollToRef, ...restProps }) {
  const classes = useStyles(restProps);
  const getSectionKey = (type, index) => `${type}-${index}`;
  const nextStep = sectionData.slug === 'next-steps';
  const dashboardReturn = sectionData.slug === 'dashboard-return';

  return (
    <div className={classes.root} ref={scrollToRef}>
      <ScaffoldContainer>
        <Grid
          container
          justify={nextStep || dashboardReturn ? 'flex-start' : 'flex-end'}
          spacing={4}
        >
          <Grid item container xs={12} sm={2}>
            <Typography variant="h2" align="right">
              {sectionData.name}
            </Typography>
          </Grid>
          <Grid item sm={1} />

          {sectionData.content.map(({ component, ...props }, index) => (
            <Grid
              key={getSectionKey(component, index)}
              item
              container
              xs={12}
              sm={component === 'callout' ? 12 : 9}
            >
              <SectionComponent type={component} index={index} {...props} {...restProps} />
            </Grid>
          ))}

          {nextStep && (
            <NextLink href="/dashboard">
              <Button
                classes={{ root: classes.button }}
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                onClick={onComplete}
              >
                COMPLETE THIS ACTIVITY
              </Button>
            </NextLink>
          )}

          {dashboardReturn && (
            <NextLink href="/dashboard">
              <Button
                classes={{ root: classes.button }}
                fullWidth
                variant="contained"
                size="large"
                color="primary"
              >
                RETURN TO MY DASHBOARD
              </Button>
            </NextLink>
          )}
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

Section.propTypes = {
  sectionData: PropTypes.objectOf(PropTypes.any).isRequired,
  backgroundColor: PropTypes.string,
  onComplete: PropTypes.func,
  scrollToRef: PropTypes.shape({
    current: PropTypes.object,
  }),
};

Section.defaultProps = {
  backgroundColor: null,
  onComplete: null,
  scrollToRef: null,
};

export default Section;
