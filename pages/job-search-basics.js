import React from 'react';
import JobSearchBasics from '../components/jobSearchBasics/JobSearchBasics';
import withTitle from '../components/withTitle';

function JobSearchBasicsPage() {
  return <JobSearchBasics />;
}

export default withTitle(JobSearchBasicsPage, 'Job Search Basics');
