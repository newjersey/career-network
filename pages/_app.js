import { ThemeProvider } from '@material-ui/styles';
import App, { Container } from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import NProgress from 'nprogress';
import React from 'react';
import Router from 'next/router';
import * as Sentry from '@sentry/browser';

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

Sentry.init({
  environment: process.env.name,
  dsn: 'https://3deb0f7b679840f28bb7931c8c33b206@sentry.io/1733812',
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
      <Container>
        <Head>
          <title>{siteName}</title>
        </Head>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <FirebaseProvider>
              <AuthProvider>
                <CssBaseline />
                <AppManager>
                  <Component {...pageProps} />
                </AppManager>
              </AuthProvider>
            </FirebaseProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </Container>
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
