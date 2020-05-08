import fetch from 'isomorphic-unfetch';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import withPageQuery from '../components/Auth/witRouterQuery';

const url = `https://us-central1-${process.env.firebase.projectId}.cloudfunctions.net/linkedinAuthorize`;

function Popup({ query }) {
  const { code, state, error } = query;

  useEffect(() => {
    if (error) {
      window.close();
    }
  }, [error]);

  useEffect(() => {
    async function fetchData() {
      const authorizedUser = await fetch(`${url}?code=${code}&state=${state}`);
      const userJson = await authorizedUser.json();

      firebase
        .auth()
        .signInWithCustomToken(userJson.token)
        .then(() => {
          window.close();
        })
        .catch(err => {
          throw new Error(`There was a problem signin in ${err.message}`);
        });
    }
    fetchData();
  }, [code, state]);

  return <div />;
}

Popup.propTypes = {
  query: PropTypes.shape({
    code: PropTypes.string,
    state: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
};

export default withPageQuery(Popup);
