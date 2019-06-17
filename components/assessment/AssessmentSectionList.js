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
  const { scrollToY } = props;
  const [activeStep, setActiveStep] = useState(0);
  const {
    assessmentSections,
    ...restProps
  } = props;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  useEffect(() => {
    window.scrollTo(0, activeStep === 0 ? 0 : scrollToY);
  }, [activeStep, scrollToY]);

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
        {activeStep === assessmentSections.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <div>
            <AssessmentSection
              assessmentSection={assessmentSections[activeStep]}
              {...restProps}
            />
            <div className={classes.buttons}>
              {!!activeStep && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === assessmentSections.length - 1 ? 'Finish' : 'Next'}
              </Button>
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
  allQuestionAnswerOptions: AirtablePropTypes.questionAnswerOptions.isRequired,
  scrollToY: PropTypes.number.isRequired,
};
