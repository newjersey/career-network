import '@firebase/analytics';
import 'core-js/stable';
import { FlagsProvider } from 'react-feature-flags';
import { ThemeProvider } from '@material-ui/styles';
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
import AnalyticsProvider from '../components/Analytics';
import AppManager from '../components/AppManager';
import AuthProvider from '../components/Auth';
import BrowserSupportAlert from '../components/BrowserSupportAlert';
import Error from './_error';
import FirebaseProvider from '../components/Firebase';
import Popup from './popup';
import theme from '../src/theme';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeError', () => NProgress.done());
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
  window.Intercom('update');
});

const featureFlags = [
  {
    name: 'userProfile',
    isActive: false,
  },
  {
    name: 'applicationTracker',
    isActive: true,
  },
];

Sentry.init({
  environment: process.env.name,
  dsn: process.env.sentry.dsn,
  integrations: [new Integrations.CaptureConsole()],
});

class MyApp extends App {
  constructor(args) {
    super(args);
    this.state = { hasError: false, isIE: false, isAuthPopup: false };
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

    const isIE = !!document.documentMode;
    this.setState({ isIE });

    this.setState({
      isAuthPopup: window.location.pathname === '/popup' || window.location.pathname === '/popup/',
    });
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
                  <AnalyticsProvider>
                    <CssBaseline />
                    <AppManager>
                      <Component {...pageProps} />
                    </AppManager>
                  </AnalyticsProvider>
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

    return (
      (this.state.isIE && <BrowserSupportAlert />) ||
      (this.state.isAuthPopup && <Popup />) ||
      (this.state.hasError ? (
        <Error eventId={this.state.eventId} showHeader />
      ) : (
        MyApp.normalComponent(Component, pageProps)
      ))
    );
  }
}

export default MyApp;
