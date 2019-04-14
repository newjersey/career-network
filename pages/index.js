import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../components/ScaffoldContainer';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 10,
  },
});

class Index extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ScaffoldContainer>
          <Typography variant="h1">Hello world.</Typography>
        </ScaffoldContainer>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
