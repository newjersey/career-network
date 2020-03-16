import '@firebase/analytics';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React from 'react';

import AnalyticsContext from './AnalyticsContext';

export default function AnalyticsProvider(props) {
  const { children } = props;

  // do not call with any PII, even hashed
  const trackEvent = (eventName, metadata) => {
    window.Intercom('trackEvent', eventName, metadata);
    firebase.analytics().logEvent(eventName.replace(/-/g, '_'), metadata);
  };

  // do not call with any PII, even hashed
  const updateProperties = properties => {
    window.Intercom('update', properties);
    firebase.analytics().setUserProperties(properties);
  };

  const value = {
    trackEvent,
    updateProperties,
  };

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}

AnalyticsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
