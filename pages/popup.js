import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import nextCookies from 'next-cookies';
import fetch from 'isomorphic-unfetch';

const url = 'http://localhost:5001/nj-career-network-dev3/us-central1/token';

const Popup = function() {
  const router = useRouter();
  const { code, state } = router.query;

  fetch(`${url}?code=${code}&state=${state}`, { mode: 'cors', credentials: 'include' })
    .then(r => {
      console.log(r);
    })
    .catch(console.log);

  useEffect(() => {}, []);

  return <div>POPUP</div>;
};

Popup.getInitialProps = async ctx => {
  // We use `nextCookie` to get the cookie and pass the token to the
  // frontend in the `props`.
  const cookies = nextCookies(ctx);
  console.log(cookies.state);
  return {
    stateCookie: cookies.state,
  };
};

export default Popup;
