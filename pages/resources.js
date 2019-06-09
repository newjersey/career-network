import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import fetch from 'unfetch';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../components/ScaffoldContainer';
import StaticCollection from '../components/StaticCollection';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
  },
  progress: {
    margin: '0 auto',
    marginTop: theme.spacing(5),
    display: 'block',
  },
}));

function Resources() {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const categoryResult = await fetch('https://careers.gardenstate.tech/api/airtable/v0/appPhpA6Quf0pCBDm/Resource%20Categories?view=API%20State%20Resources%20Page');
      const categoryJson = await categoryResult.json();
      const categoryRecords = categoryJson.records.filter(c => c.fields.Resources);

      const itemResult = await fetch('https://careers.gardenstate.tech/api/airtable/v0/appPhpA6Quf0pCBDm/Resources?view=API%20State%20Resources%20Page');
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
        <Typography variant="h3" component="h1">State Resources</Typography>
        <Typography variant="subtitle1">
          Find information and links about the state resources available to you
          through in-person and online services.
        </Typography>
        {categories.length
          ? null
          : <CircularProgress className={classes.progress} color="secondary" />
        }
        <StaticCollection categories={categories} />
      </ScaffoldContainer>
    </div>
  );
}

export default Resources;
