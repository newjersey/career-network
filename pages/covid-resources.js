import React from 'react';
import CovidResources from '../components/covidResources/CovidResources';
import withTitle from '../components/withTitle';

function CovidResourcesPage() {
  return <CovidResources />;
}

export default withTitle(CovidResourcesPage, 'COVID-19 Resources');
