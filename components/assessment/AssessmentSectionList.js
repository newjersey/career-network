import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../Airtable/PropTypes';
import AssessmentSection from './AssessmentSection';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(3, 0, 8),
    marginLeft: 'auto',
    marginRight: 'auto', // TODO fix this grossness
    maxWidth: 780,
    position: 'relative',
  },
  button: {
    color: 'white',
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(1, 8, 1, 8),
    position: 'absolute',
    right: 0,
    top: 1,
  },
}));

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function AssessmentSectionList(props) {
  const classes = useStyles();
  const { scrollToY } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [isActiveSectionValid, setIsActiveSectionValid] = useState(false);
  const [reflectValidity, setReflectValidity] = useState(false);
  const { assessmentSections, enforceValidity, onComplete, ...restProps } = props;

  const handleNext = () => {
    if (isActiveSectionValid || !enforceValidity) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    } else {
      setReflectValidity(true);
    }
  };

  const handleBack = () => {
    setReflectValidity(false);
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleValidationChange = isValid => {
    setIsActiveSectionValid(isValid);

    if (isValid) {
      setReflectValidity(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, activeStep === 0 ? 0 : scrollToY);
  }, [activeStep, scrollToY]);

  useEffect(() => {
    if (activeStep === assessmentSections.length && typeof onComplete === 'function') {
      onComplete();
    }
  }, [activeStep, assessmentSections, onComplete]);

  return (
    <div>
      {activeStep !== assessmentSections.length && (
        <div>
          <AssessmentSection
            assessmentSection={assessmentSections[activeStep]}
            currentStep={activeStep + 1}
            totalSteps={assessmentSections.length}
            onValidationChange={handleValidationChange}
            reflectValidity={reflectValidity}
            {...restProps}
          />
          <div className={classes.buttons}>
            {reflectValidity && !isActiveSectionValid && (
              <Typography variant="subtitle2" color="error" className={classes.error}>
                Please complete all questions.
              </Typography>
            )}
            {!!activeStep && (
              <Button onClick={handleBack} style={{ textDecoration: 'underline' }}>
                Back
              </Button>
            )}
            {(onComplete || activeStep < assessmentSections.length - 1) && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === assessmentSections.length - 1 ? 'Finish' : 'Next'}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

AssessmentSectionList.propTypes = {
  assessmentSections: AirtablePropTypes.assessmentSections.isRequired,
  allAssessmentSubsections: AirtablePropTypes.assessmentSubsections.isRequired,
  allAssessmentEntries: AirtablePropTypes.assessmentEntries.isRequired,
  allQuestions: AirtablePropTypes.questions.isRequired,
  allQuestionGroups: AirtablePropTypes.questionGroups.isRequired,
  allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
  enforceValidity: PropTypes.bool,
  onComplete: PropTypes.func,
  readOnly: PropTypes.bool,
  scrollToY: PropTypes.number.isRequired,
};

AssessmentSectionList.defaultProps = {
  enforceValidity: false,
  readOnly: false,
  onComplete: null,
};
