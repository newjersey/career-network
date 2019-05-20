import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import fetch from 'unfetch';
import PropTypes from 'prop-types';
import React from 'react';
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

class Tools extends React.Component {
  constructor() {
    super();
    this.state = { categories: [] };
  }

  async componentDidMount() {
    const categoryResult = await fetch('https://careers.gardenstate.tech/api/airtable/v0/appPhpA6Quf0pCBDm/Resource%20Categories?view=API%20Toolkit%20Page');
    const categoryJson = await categoryResult.json();
    const categories = categoryJson.records.filter(c => c.fields['Resources']);

    const itemResult = await fetch('https://careers.gardenstate.tech/api/airtable/v0/appPhpA6Quf0pCBDm/Resources?view=API%20Toolkit%20Page');
    const itemJson = await itemResult.json();
    const items = itemJson.records;

    categories.forEach(category => {
      category.items = category.fields['Resources']
        .map(itemId => items.find(item => item.id === itemId))
        .filter(item => item);
    });

    this.setState({
      categories: categories.filter(category => category.items.length),
    });
  }

  render() {
    const { classes } = this.props;
    const { categories } = this.state;

    return (
      <div className={classes.root}>
        <ScaffoldContainer>
          <Typography variant="h3" component="h1">Job Search Toolkit</Typography>
          <Typography variant="subtitle1">
            Multiple resources to make your job search more effective
          </Typography>
          {categories.length ? null :
            <CircularProgress className={classes.progress} color="secondary" />
          }
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
