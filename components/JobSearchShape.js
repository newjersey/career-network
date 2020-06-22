import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Picture from './Picture';
import { FINDING_JOB, APPLYING_FOR_JOBS, TAKING_CARE } from '../constants';

const useStyles = makeStyles(() => ({
  shape: {
    width: 368,
    height: 'auto',
  },
}));

const IMAGE_NAMES = {
  [FINDING_JOB]: 'finding-job.png',
  [APPLYING_FOR_JOBS]: 'applying-for-jobs.png',
  [TAKING_CARE]: 'taking-care.png',
};

const JobSearchShape = ({ jobSearchCategory, className }) => {
  const classes = useStyles();
  return (
    <Picture
      alt="job-search-category-image"
      fallbackType="png"
      path={IMAGE_NAMES[jobSearchCategory]}
      className={clsx(classes.shape, className)}
    />
  );
};

JobSearchShape.propTypes = {
  className: PropTypes.string,
  jobSearchCategory: PropTypes.oneOf([FINDING_JOB, APPLYING_FOR_JOBS, TAKING_CARE]).isRequired,
};

JobSearchShape.defaultProps = {
  className: '',
};

export default JobSearchShape;
