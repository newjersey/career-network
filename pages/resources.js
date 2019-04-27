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

class Resources extends React.Component {
  static async getInitialProps() {
    const categoryResult = await fetch('https://careers.gardenstate.tech/api/airtable/v0/appGaFhVzDGjrivJa/Resource%20Categories?view=API');
    const categoryJson = await categoryResult.json();
    const categories = categoryJson.records.filter(c => c.fields['Resources']);

    const itemResult = await fetch('https://careers.gardenstate.tech/api/airtable/v0/appGaFhVzDGjrivJa/Resources?view=API');
    const itemJson = await itemResult.json();
    const items = itemJson.records;

    categories.forEach(category => {
      category.items = category.fields['Resources'].map(
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
          <Typography variant="h4" component="h1">State Resources</Typography>
          <Typography variant="subtitle1">
            Great list of Tools brought to you by the State of New Jersey.
            </Typography>
          <StaticCollection {...{ categories }} />
        </ScaffoldContainer>
      </div>
    );
  }
}

Resources.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Resources);
