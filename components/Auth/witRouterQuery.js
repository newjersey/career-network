import React from 'react';
import { withRouter } from 'next/router';

const withPageQuery = Component => {
  const routerWrapper = withRouter(({ router, ...props }) => {
    const query = [...new URLSearchParams((router.asPath || '').split(/\?/)[1]).entries()].reduce(
      (q, [k, v]) => Object.assign(q, { [k]: v }),
      {}
    );

    return <Component {...props} query={query} />;
  });
  routerWrapper.getInitialProps = Component.getInitialProps;
  return routerWrapper;
};

export default withPageQuery;
