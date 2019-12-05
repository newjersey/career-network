import firebase from 'firebase/app';
import 'firebase/firestore';
import PropTypes from 'prop-types';

const { QueryDocumentSnapshot } = firebase.firestore;
const queryDocumentSnapshot = PropTypes.instanceOf(QueryDocumentSnapshot);
const querySnapshot = PropTypes.arrayOf(queryDocumentSnapshot);

export default {
  queryDocumentSnapshot,
  querySnapshot,
};
