import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import Picture from './Picture';
import ScaffoldContainer from './ScaffoldContainer';

const color = '#fff';
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#333',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    color,
  },
});

function Footer(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Grid container direction="column" spacing={8}>
              <Grid item>
                <Link href="https://nj.gov/opra/">
                  <Picture path="opra.webp" fallbackType="png" alt="OPRA Logo" />
                </Link>
              </Grid>
              <Grid item>
                <Link href="https://my.state.nj.us/openam/UI/Login">
                  <Picture path="myNJ.webp" fallbackType="png" alt="My New Jersey Logo" />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
