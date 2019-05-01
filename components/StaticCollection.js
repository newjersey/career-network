import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import StaticCollectionItem from './StaticCollectionItem';

const styles = theme => ({
  root: {
    width: '100%',
    paddingBottom: theme.spacing.unit * 5,
  },
  gridItem: {
    '&$withSpecificity': {
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
      },
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing.unit * 1.25,
        paddingBottom: theme.spacing.unit * 1.25,
      },
    }
  },
  withSpecificity: { /* NOOP */ },
  category: {
    marginTop: theme.spacing.unit * 7,
  },
  description: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class StaticCollection extends React.Component {
  render() {
    const { classes, categories } = this.props;
    const gridItemClassName = `${classes.gridItem} ${classes.withSpecificity}`;

    return (
      <div className={classes.root}>
        {categories.map(category =>
          <React.Fragment key={category.id}>
            <Typography variant="h4" component="h2" className={classes.category}>{category.fields.Name}</Typography>
            <Typography variant="body1" gutterBottom className={classes.description}>
              {category.fields.Description}
            </Typography>
            <Grid container spacing={24}>
              {category.items.map(item =>
                <Grid key={item.fields.Name} item xs={12} sm={6} md={4} className={gridItemClassName}>
                  <StaticCollectionItem item={item} />
                </Grid>
              )}
            </Grid>
          </React.Fragment>
        )}
      </div>
    );
  }
}

StaticCollection.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};

export default withStyles(styles)(StaticCollection);
