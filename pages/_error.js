import React from 'react';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import { Container } from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import Head from 'next/head';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import theme from '../src/theme';

const logoRatio = 834 / 784;
const styles = {
  logo: {
    position: 'relative',
    top: '4px',
    margin: '.8em .8em .8em 1.8em',
    width: 60,
    height: 60 * logoRatio,
  },
  title: {
    fontSize: '1.5em',
    fontWeight: 300,
    cursor: 'pointer',
  },
  error: {
    margin: '1.8em',
  },
};

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    let statusCode;
    if (res) {
      ({ statusCode } = res);
    } else {
      ({ statusCode } = err || null);
    }

    return { statusCode };
  }

  render() {
    const { classes, showHeader, statusCode } = this.props;

    return (
      <Container>
        <Head>
          <title>Unexpected Error - Career Network</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {showHeader && (
            <header>
              <AppBar position="static" color="default">
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <img
                        src="/static/img/nj.png"
                        alt="New Jersey Logo"
                        className={classes.logo}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h1" color="primary" className={classes.title}>
                        Career
                        <br />
                        Network
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AppBar>
            </header>
          )}
          <main className={classes.error}>
            <Typography variant="h4">Unexpected Error</Typography>
            <Typography variant="subtitle1">
              The current action could not be performed successfully.
            </Typography>
            <Typography variant="body1">
              Our team has already been notified and will try to fix this issue as soon as possible.
              If the problem persists, please
              {' '}
              <Link href="mailto:careers@gardenstate.tech?subject=Website Feedback">
                contact us
              </Link>
              .
            </Typography>
            <br />
            {statusCode && (
              <Typography variant="body2">
                Status Code:
                {' '}
                {statusCode}
              </Typography>
            )}
          </main>
        </ThemeProvider>
      </Container>
    );
  }
}

Error.propTypes = {
  showHeader: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  statusCode: PropTypes.number,
};

Error.defaultProps = {
  showHeader: false,
  statusCode: undefined,
};

export default withStyles(styles)(Error);
