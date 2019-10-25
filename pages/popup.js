import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import fetch from 'isomorphic-unfetch';
import withPageQuery from '../components/Auth/witRouterQuery';

const url = `https://us-central1-${process.env.firebase.projectId}.cloudfunctions.net/token`;

const Popup = function({ router }) {
  const { code, state } = router.query;

  useEffect(() => {
    fetch(`${url}?code=${code}&state=${state}`, {
      mode: 'cors',
    })
      .then(r => r.json())
      .then(r => firebase.auth().signInWithCustomToken(r.token))
      .catch(error => {
        alert(`There was a problem signin in ${error.message}`);
      });
  }, []);

  return <div>Redirecting...</div>;
};

Popup.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      code: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default withPageQuery(Popup);
