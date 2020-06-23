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
  },
}));
function Section({ sectionData, onComplete, ...restProps }) {
  const classes = useStyles(restProps);
  const getSectionKey = (type, index) => `${type}-${index}`;
  const nextStep = sectionData.slug === 'next-steps';

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container justify={nextStep ? 'flex-start' : 'flex-end'} spacing={4}>
          <Grid item container xs={12} sm={2}>
            <Typography component="h2" variant="h3" align="right">
              {sectionData.name}
            </Typography>
          </Grid>
          <Grid item xs={0} sm={1} />

          {sectionData.content.map(({ component, ...props }, index) => (
            <Grid item container xs={12} sm={component === 'callout' ? 12 : 9}>
              <SectionComponent
                key={getSectionKey(component, index)}
                type={component}
                {...props}
                {...restProps}
              />
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
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

Section.propTypes = {
  sectionData: PropTypes.objectOf(PropTypes.any).isRequired,
  backgroundColor: PropTypes.string,
  onComplete: PropTypes.func,
};

Section.defaultProps = {
  backgroundColor: null,
  onComplete: null,
};

export default Section;
