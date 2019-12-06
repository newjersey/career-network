import firebase from 'firebase/app';
import 'firebase/firestore';
import PropTypes from 'prop-types';

const { QueryDocumentSnapshot } = firebase.firestore;

const timestamp = PropTypes.instanceOf(firebase.firestore.Timestamp);
const queryDocumentSnapshot = PropTypes.instanceOf(QueryDocumentSnapshot);
const querySnapshot = PropTypes.arrayOf(queryDocumentSnapshot);

export default {
  queryDocumentSnapshot,
  querySnapshot,
  timestamp,
};
