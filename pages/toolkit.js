import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useNestedRecords } from '../components/Airtable';
import FullPageProgress from '../components/FullPageProgress';
import ScaffoldContainer from '../components/ScaffoldContainer';
import StaticCollection from '../components/StaticCollection';
import withTitle from '../components/withTitle';

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

function Tools() {
  const classes = useStyles();
  const categories = useNestedRecords({
    parentRecordsApiPath: 'Resource Categories?view=API Toolkit Page',
    childRecordsApiPath: 'Resources?view=API Toolkit Page',
    childIdColumnName: 'Resources',
  });

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography variant="h3" component="h1">
          Job Search Toolkit
        </Typography>
        <Typography variant="subtitle1">
          Multiple resources to make your job search more effective
        </Typography>
        {categories.length ? <StaticCollection categories={categories} /> : <FullPageProgress />}
      </ScaffoldContainer>
    </div>
  );
}

export default withTitle(Tools, 'Tools');
