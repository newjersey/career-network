import { ThemeProvider } from '@material-ui/styles';
import App, { Container } from 'next/app';
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

    return this.state.hasError ? <Error showHeader /> : MyApp.normalComponent(Component, pageProps);
  }
}

export default MyApp;
