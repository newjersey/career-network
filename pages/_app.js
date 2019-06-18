import { ThemeProvider } from '@material-ui/styles';
import App, { Container } from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import NProgress from 'nprogress';
import React from 'react';
import Router from 'next/router';

import { SnackbarProvider } from '../components/Snackbar';
import AuthProvider from '../components/Auth';
import FirebaseProvider from '../components/Firebase';
import AppManager from '../components/AppManager';
import theme from '../src/theme';

// eslint-disable-next-line no-unused-vars
Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

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
                  <Component pageContext={this.pageContext} {...pageProps} />
                </AppManager>
              </AuthProvider>
            </FirebaseProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
