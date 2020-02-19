import 'core-js/stable';
import { ThemeProvider } from '@material-ui/styles';
import { FlagsProvider } from 'react-feature-flags';
import * as Integrations from '@sentry/integrations';
import * as Sentry from '@sentry/browser';
import App from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import NProgress from 'nprogress';
import React from 'react';
import Router from 'next/router';

import { siteName } from '../components/withTitle';
import { SnackbarProvider } from '../components/Snackbar';
import AppManager from '../components/AppManager';
import AuthProvider from '../components/Auth';
import Error from './_error';
import FirebaseProvider from '../components/Firebase';
import theme from '../src/theme';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
Router.events.on('routeChangeComplete', () => window.Intercom('update'));

const featureFlags = [
  // Feature flag introduced with https://trello.com/c/FLzzfmsI/121, should be
  // complete by end of "Release 7"
  {
    name: 'employmentOutlook',
    isActive: true,
  },
  {
    name: 'completeSentiment',
    isActive: false,
  },
];

Sentry.init({
  environment: process.env.name,
  dsn: process.env.sentry.dsn,
  integrations: [new Integrations.CaptureConsole()],
  beforeSend(event, hint) {
    // log errors in Intercom, just to track who might be having issues
    if (event && event.level === 'error') {
      try {
        const error = hint.originalException || hint.syntheticException;

        window.Intercom('update', { 'last-browser-error': new Date() });
        window.Intercom('trackEvent', 'browser-error', {
          code: error && error.code,
          name: error && error.name,
          message: error && error.message,
          sentry_message: event && event.message,
          sentry_event_id: event && event.event_id,
        });
      } catch {
        // NOOP (prevent invinite loop if error in Intercom reporting)
      }
    }

    return event;
  },
});

class MyApp extends App {
  constructor(args) {
    super(args);
    this.state = { hasError: false };
  }

  static async getInitialProps({ Component, ctx }) {
    try {
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      return { pageProps };
    } catch (error) {
      Sentry.captureException(error);
      return { hasError: true };
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      hasError: props.hasError || state.hasError || false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ error, errorInfo, eventId });
    });
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  static normalComponent(Component, pageProps) {
    return (
      <>
        <Head>
          <title>{siteName}</title>
        </Head>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <FirebaseProvider>
              <AuthProvider>
                <FlagsProvider value={featureFlags}>
                  <CssBaseline />
                  <AppManager>
                    <Component {...pageProps} />
                  </AppManager>
                </FlagsProvider>
              </AuthProvider>
            </FirebaseProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </>
    );
  }

  render() {
    const { Component, pageProps } = this.props;

    return this.state.hasError ? (
      <Error eventId={this.state.eventId} showHeader />
    ) : (
      MyApp.normalComponent(Component, pageProps)
    );
  }
}

export default MyApp;
