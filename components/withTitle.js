import React from 'react';
import Head from 'next/head';

export const siteName = 'Career Network';

const withTitle = (WrappedComponent, pageTitle) => props => {
  const title = pageTitle ? `${pageTitle} – ${siteName}` : siteName;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <WrappedComponent {...props} />
    </>
  );
};

export default withTitle;
