import firebase from 'firebase/app';
import 'firebase/firestore';
import PropTypes from 'prop-types';

const { QueryDocumentSnapshot } = firebase.firestore;

const querySnapshot = PropTypes.arrayOf(PropTypes.instanceOf(QueryDocumentSnapshot));

export default {
  querySnapshot,
};
