import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

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
  logo: {
    width: '160px',
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
                  <img src="/static/img/opra.svg" alt="OPRA Logo" className={classes.logo} />
                </Link>
              </Grid>
              <Grid item>
                <Link href="https://my.state.nj.us/">
                  <img src="/static/img/myNJ.svg" alt="My New Jersey Logo" className={classes.logo} />
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
