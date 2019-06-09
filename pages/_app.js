import { ThemeProvider } from '@material-ui/styles';
import App, { Container } from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import React from 'react';

import Firebase, { FirebaseContext } from '../components/Firebase';
import Footer from '../components/Footer';
import Header from '../components/Header';
import theme from '../src/theme';

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
        <FirebaseContext.Provider value={new Firebase()}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
            <Header />
            <main>
              <Component pageContext={this.pageContext} {...pageProps} />
            </main>
            <Footer />
          </ThemeProvider>
        </FirebaseContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
