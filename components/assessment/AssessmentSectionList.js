import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../Airtable/PropTypes';
import AssessmentSection from './AssessmentSection';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  stepper: {
    backgroundColor: 'inherit',
    padding: 0,
    marginBottom: theme.spacing(12),
  },
  stepLabel: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: theme.spacing(3, 0, 5),
    marginLeft: 'auto',
    marginRight: 'auto', // TODO fix this grossness
    maxWidth: 780,
  },
  button: {
    marginLeft: theme.spacing(1),
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
    <div className={classes.root}>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {assessmentSections.map(section => (
          <Step key={section.id}>
            <StepLabel>
              <span className={classes.stepLabel}>{section.fields['Short Name']}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep !== assessmentSections.length && (
          <div>
            <AssessmentSection
              assessmentSection={assessmentSections[activeStep]}
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
                <Button onClick={handleBack} className={classes.button}>
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
    </div>
  );
}

AssessmentSectionList.propTypes = {
  assessmentSections: AirtablePropTypes.assessmentSections.isRequired,
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
