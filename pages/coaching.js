import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../components/ScaffoldContainer';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Coaching extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ScaffoldContainer>
          <Typography variant="h1">Career coaching.</Typography>
        </ScaffoldContainer>
      </div>
    );
  }
}

Coaching.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Coaching);
