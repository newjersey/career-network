import { ThemeProvider, withStyles } from '@material-ui/styles';
import * as Sentry from '@sentry/browser';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

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
  feedback: {
    marginTop: '1em',
  },
  statusCode: {
    marginTop: '1em',
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
    const { classes, eventId, showHeader, statusCode } = this.props;

    if (eventId) {
      Sentry.showReportDialog({ eventId });
    }

    return (
      <>
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
              If the problem persists, please{' '}
              <Link href="mailto:team@njcareers.org?subject=Website Feedback">contact us</Link>.
            </Typography>
            {statusCode && (
              <Typography variant="body2" className={classes.statusCode}>
                Status Code: {statusCode}
              </Typography>
            )}
          </main>
        </ThemeProvider>
      </>
    );
  }
}

Error.propTypes = {
  eventId: PropTypes.string,
  showHeader: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  statusCode: PropTypes.number,
};

Error.defaultProps = {
  eventId: undefined,
  showHeader: false,
  statusCode: undefined,
};

export default withStyles(styles)(Error);
