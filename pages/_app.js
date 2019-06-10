import { ThemeProvider } from '@material-ui/styles';
import App, { Container } from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import React from 'react';

import Firebase, { FirebaseContext } from '../components/Firebase';
import { UserProvider } from '../components/User';
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
        <ThemeProvider theme={theme}>
          <UserProvider>
            <FirebaseContext.Provider value={new Firebase()}>
              <CssBaseline />
              <Header />
              <main>
                {/* Pass pageContext to the _document though the renderPage enhancer
                  to render collected styles on server-side. */}
                <Component pageContext={this.pageContext} {...pageProps} />
              </main>
              <Footer />
            </FirebaseContext.Provider>
          </UserProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
