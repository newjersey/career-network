import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ScaffoldContainer from '../../ScaffoldContainer';
import Explore from './Explore';
import { JOB_SEARCH_CATEGORY_COLORS, JOB_SEARCH_CATEGORIES } from '../../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    backgroundColor: theme.palette.background.header,
  },
}));
function ExploreSection({ sectionData, category }) {
  const classes = useStyles();
  const categoryColor = JOB_SEARCH_CATEGORY_COLORS[category];
  const categoryType = JOB_SEARCH_CATEGORIES.find(cat => cat.slug === category);

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container justify="flex-end" spacing={4}>
          <Grid item container xs={12} sm={2}>
            <Typography variant="h2" align="right">
              {categoryType.name}
            </Typography>
          </Grid>
          <Grid item sm={1} />
          {sectionData.content.map(({ milestone }) => (
            <Grid key={milestone} item container xs={12} sm={9}>
              <Explore milestoneSlug={milestone} categoryColor={categoryColor} />
            </Grid>
          ))}
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

ExploreSection.propTypes = {
  sectionData: PropTypes.objectOf(PropTypes.any).isRequired,
  category: PropTypes.string.isRequired,
};

export default ExploreSection;
