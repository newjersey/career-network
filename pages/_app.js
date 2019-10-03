import { ThemeProvider } from '@material-ui/styles';
import App, { Container } from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import NProgress from 'nprogress';
import React from 'react';
import Router from 'next/router';

import Error from './_error';
import { SnackbarProvider } from '../components/Snackbar';
import AuthProvider from '../components/Auth';
import FirebaseProvider from '../components/Firebase';
import AppManager from '../components/AppManager';
import theme from '../src/theme';

// eslint-disable-next-line no-unused-vars
Router.events.on('routeChangeStart', url => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
      // TODO: send error to reporting system (Sentry, Rollbar, etc.)
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
    // TODO: send error to reporting system (Sentry, Rollbar, etc.)
    this.setState({ error, errorInfo });
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
          <title>Career Network</title>
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

    return this.state.hasError ? <Error showHeader /> : MyApp.normalComponent(Component, pageProps);
  }
}

export default MyApp;
