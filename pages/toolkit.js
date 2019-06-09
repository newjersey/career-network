import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import fetch from 'unfetch';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../components/ScaffoldContainer';
import StaticCollection from '../components/StaticCollection';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 5,
  },
  progress: {
    margin: '0 auto',
    marginTop: theme.spacing.unit * 5,
    display: 'block',
  },
});

function Tools(props) {
  const { classes } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const categoryResult = await fetch('https://careers.gardenstate.tech/api/airtable/v0/appPhpA6Quf0pCBDm/Resource%20Categories?view=API%20Toolkit%20Page');
      const categoryJson = await categoryResult.json();
      const categoryRecords = categoryJson.records.filter(c => c.fields.Resources);

      const itemResult = await fetch('https://careers.gardenstate.tech/api/airtable/v0/appPhpA6Quf0pCBDm/Resources?view=API%20Toolkit%20Page');
      const itemJson = await itemResult.json();
      const items = itemJson.records;

      categoryRecords.forEach((category) => {
        // eslint-disable-next-line no-param-reassign
        category.items = category.fields.Resources
          .map(itemId => items.find(item => item.id === itemId))
          .filter(item => item);
      });

      setCategories(categoryRecords.filter(category => category.items.length));
    })();
  }, []);

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography variant="h3" component="h1">Job Search Toolkit</Typography>
        <Typography variant="subtitle1">
          Multiple resources to make your job search more effective
        </Typography>
        {categories.length
          ? <StaticCollection categories={categories} />
          : <CircularProgress className={classes.progress} color="secondary" />
        }
      </ScaffoldContainer>
    </div>
  );
}

Tools.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tools);
