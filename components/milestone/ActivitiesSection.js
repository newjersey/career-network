import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import SectionComponent from '../activityTemplate/SectionComponent';
import ActivityTemplateCard from '../dashboard/ActivityTemplateCard';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
}));
function ActivitiesSection({ sectionData, activityTemplates }) {
  const classes = useStyles();
  const getSectionKey = (type, index) => `${type}-${index}`;

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container justify="flex-end" spacing={4}>
          <Grid item container xs={12} sm={2}>
            <Typography variant="h2" align="right">
              {sectionData.name}
            </Typography>
          </Grid>
          <Grid item sm={1} />
          {sectionData.content.map(({ component, ...props }, index) => (
            <Grid key={getSectionKey(component, index)} item container xs={12} sm={9}>
              <SectionComponent type={component} index={index} {...props} />
            </Grid>
          ))}
          <Grid item container xs={12} sm={9}>
            {activityTemplates.map(template => (
              <ActivityTemplateCard
                key={template.slug}
                totalTime={template.total_time}
                {...template}
              />
            ))}
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

ActivitiesSection.propTypes = {
  sectionData: PropTypes.objectOf(PropTypes.any).isRequired,
  activityTemplates: PropTypes.arrayOf(PropTypes.object),
};

ActivitiesSection.defaultProps = {
  activityTemplates: [],
};

export default ActivitiesSection;
