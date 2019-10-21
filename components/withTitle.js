import React from 'react';
import Head from 'next/head';

export const siteName = 'Career Network';

const withTitle = (WrappedComponent, pageTitle) => props => {
  const title = pageTitle ? `${pageTitle} – ${siteName}` : siteName;

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <WrappedComponent {...props} />
    </React.Fragment>
  );
};

export default withTitle;
