import { withStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../components/ScaffoldContainer';
import StaticCollection from '../components/StaticCollection';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 4,
  },
});

class Tools extends React.Component {
  static async getInitialProps() {
    const categoryResult = await fetch('https://careers.gardenstate.tech/api/airtable/v0/appGaFhVzDGjrivJa/Tool%20Categories?view=API');
    const categoryJson = await categoryResult.json();
    const categories = categoryJson.records.filter(c => c.fields['Tools']);

    const itemResult = await fetch('https://careers.gardenstate.tech/api/airtable/v0/appGaFhVzDGjrivJa/Tools?view=API');
    const itemJson = await itemResult.json();
    const items = itemJson.records;

    categories.forEach(category => {
      category.items = category.fields['Tools'].map(
        itemId => items.find(item => item.id === itemId)
      );
    });

    return { categories };
  }

  render() {
    const { categories, classes } = this.props;

    return (
      <div className={classes.root}>
        <ScaffoldContainer>
          <Typography variant="h4" component="h1">Job Toolkit</Typography>
          <Typography variant="subtitle1">
            Tools that might help with your job search.
         </Typography>
          <StaticCollection categories={categories} />
        </ScaffoldContainer>
      </div>
    );
  }
}

Tools.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tools);
