import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import StaticCollectionItem from './StaticCollectionItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingBottom: theme.spacing(5),
  },
  gridItem: {
    '&$withSpecificity': {
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(1.25),
        paddingBottom: theme.spacing(1.25),
      },
    },
  },
  withSpecificity: {
    /* NOOP */
  },
  category: {
    marginTop: theme.spacing(6),
  },
  description: {
    marginBottom: theme.spacing(2),
  },
}));

function StaticCollection(props) {
  const { categories } = props;
  const classes = useStyles();
  const gridItemClassName = clsx(classes.gridItem, classes.withSpecificity);

  return (
    <div className={classes.root}>
      {categories.map(category => (
        <React.Fragment key={category.id}>
          <Typography variant="h4" component="h2" className={classes.category}>
            {category.fields.Name}
          </Typography>
          {category.fields.Description && (
            <Typography variant="body1" gutterBottom className={classes.description}>
              {category.fields.Description}
            </Typography>
          )}
          <Grid container spacing={3}>
            {category.items.map(item => (
              <Grid key={item.fields.Name} item xs={12} sm={6} md={4} className={gridItemClassName}>
                <StaticCollectionItem item={item} />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      ))}
    </div>
  );
}

StaticCollection.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fields: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string,
      }).isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.shape({
            Name: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    })
  ).isRequired,
};

export default StaticCollection;
