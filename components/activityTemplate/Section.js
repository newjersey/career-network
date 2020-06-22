import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ScaffoldContainer from '../ScaffoldContainer';
import SectionComponent from './SectionComponent';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
    backgroundColor: props => props.backgroundColor || theme.palette.background.paper,
  },
}));

function Section({ sectionData, ...restProps }) {
  const classes = useStyles(restProps);

  const getSectionKey = (type, index) => `${type}-${index}`;

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container>
          <Grid item container xs={12} sm={4}>
            <Typography className={classes.title} component="h2" variant="h3">
              {sectionData.name}
            </Typography>
          </Grid>

          {sectionData.content.map(({ component, ...props }, index) => (
            <Grid item container xs={12} sm={component === 'callout' ? 12 : 6}>
              <SectionComponent key={getSectionKey(component, index)} type={component} {...props} />
            </Grid>
          ))}
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

Section.propTypes = {
  sectionData: PropTypes.objectOf(PropTypes.any).isRequired,
  backgroundColor: PropTypes.string,
};

Section.defaultProps = {
  backgroundColor: null,
};

export default Section;
