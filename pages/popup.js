import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase';

import fetch from 'isomorphic-unfetch';

const url = 'http://localhost:5001/nj-career-network-dev3/us-central1/token';

const Popup = function() {
  const router = useRouter();
  const { code, state } = router.query;

  // console.log(state, stateCookie);

  useEffect(() => {
    fetch(`${url}?code=${code}&state=${state}`, {
      mode: 'cors',
    })
      .then(r => r.json())
      .then(r => {
        console.log(r);

        firebase
          .auth()
          .signInWithCustomToken(r.token)
          .catch(function(error) {
            // Handle Errors here.
            console.log(error);
          });
      })
      .catch(console.log);
  }, []);

  return <div>POPUP</div>;
};

export default Popup;
