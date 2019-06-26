import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useNestedRecords } from '../components/Airtable';
import FullPageProgress from '../components/FullPageProgress';
import ScaffoldContainer from '../components/ScaffoldContainer';
import StaticCollection from '../components/StaticCollection';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
  },
}));

function Resources() {
  const classes = useStyles();
  const categories = useNestedRecords({
    parentRecordsApiPath:
      'appPhpA6Quf0pCBDm/Resource%20Categories?view=API%20State%20Resources%20Page',
    childRecordsApiPath: 'appPhpA6Quf0pCBDm/Resources?view=API%20State%20Resources%20Page',
    childIdColumnName: 'Resources',
  });

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography variant="h3" component="h1">
          State Resources
        </Typography>
        <Typography variant="subtitle1">
          Find information and links about the state resources available to you through in-person
          and online services.
        </Typography>
        {categories.length ? null : <FullPageProgress />}
        <StaticCollection categories={categories} />
      </ScaffoldContainer>
    </div>
  );
}

export default Resources;
