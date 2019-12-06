import firebase from 'firebase/app';
import 'firebase/firestore';
import PropTypes from 'prop-types';

const { QueryDocumentSnapshot } = firebase.firestore;
const timestamp = PropTypes.instanceOf(firebase.firestore.Timestamp);
const querySnapshot = PropTypes.arrayOf(PropTypes.instanceOf(QueryDocumentSnapshot));

export default {
  querySnapshot,
  timestamp,
};
