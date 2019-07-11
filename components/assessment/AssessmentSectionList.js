import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { Formik } from 'formik';

import { useAuth } from '../Auth';
import AirtablePropTypes from '../Airtable/PropTypes';
import AssessmentSection from './AssessmentSection';
import FirebasePropTypes from '../Firebase/PropTypes';
import { retrieveActiveResponses } from '../../src/assessment-helper';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  stepper: {
    backgroundColor: 'inherit',
    padding: 0,
    marginBottom: theme.spacing(5),
  },
  stepLabel: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing(3, 0, 5),
    marginLeft: 'auto',
    marginRight: 'auto', // TODO fix this grossness
    maxWidth: 780,
  },
  button: {
    '&:first-child': {
      marginRight: theme.spacing(1),
    },
  },
}));


export default function AssessmentSectionList(props) {
  const classes = useStyles();
  const { user } = useAuth();
  const { scrollToY } = props;
  const [activeStep, setActiveStep] = useState(0);
  const { assessmentSections, onComplete, ...restProps } = props;

  const handleValidation = (values) => {
    const errors = {};
    Object.entries(values)
      .forEach(([key, value]) => {
        if (!value) {
          errors[key] = true;
        }
      });
    return errors;
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  useEffect(() => {
    window.scrollTo(0, activeStep === 0 ? 0 : scrollToY);
  }, [activeStep, scrollToY]);

  useEffect(() => {
    if (activeStep === assessmentSections.length && typeof onComplete === 'function') {
      onComplete();
    }
  }, [activeStep, assessmentSections, onComplete, restProps.allQuestionResponses]);

  const stepValues = retrieveActiveResponses(
    assessmentSections[activeStep],
    restProps.allQuestions,
    restProps.allQuestionResponses,
    user,
  );

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
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                setActiveStep(prevActiveStep => prevActiveStep + 1);
                setSubmitting(false);
              }}
              initialValues={stepValues}
              validate={handleValidation}
              enableReinitialize
            >
              {(formikProps) => {
                const { handleSubmit } = formikProps;
                return (
                  <form onSubmit={handleSubmit}>
                    <AssessmentSection
                      assessmentSection={assessmentSections[activeStep]}
                      {...{ ...formikProps, ...restProps }}
                    />
                    <div className={classes.buttons}>
                      {!!activeStep && (
                        <Button onClick={handleBack} className={classes.button}>
                          Back
                        </Button>
                      )}
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        {activeStep === assessmentSections.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </form>
                );
              }}
            </Formik>
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
  onComplete: PropTypes.func.isRequired,
  scrollToY: PropTypes.number.isRequired,
};
