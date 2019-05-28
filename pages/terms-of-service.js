import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../components/ScaffoldContainer';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 5,
  },
});

class TOS extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ScaffoldContainer>
          <Typography variant="h3" component="h1">Terms of Service</Typography>
        </ScaffoldContainer>
      </div>
    );
  }
}

TOS.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TOS);
