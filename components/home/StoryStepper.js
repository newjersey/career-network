import { autoPlay } from 'react-swipeable-views-utils';
import { makeStyles, useTheme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import FormatQuote from '@material-ui/icons/FormatQuote';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const steps = [
  {
    quotation: 'Never put off till tomorrow what you can do today.',
    author: 'Thomas Jefferson',
  },
  {
    quotation: 'One important key to success is self-confidence. An important key to self-confidence is preparation.',
    author: 'Arthur Ashe',
  },
  {
    quotation: 'You miss 100% of the shots you don’t take.',
    author: 'Wayne Gretzky',
  },
  {
    quotation: 'Do one thing every day that scares you.',
    author: 'Eleanor Roosevelt',
  },
  {
    quotation: 'Success doesn’t come to you, you go to it.',
    author: 'Marva Collins',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  story: {
    overflow: 'hidden',
    height: '12rem',
    [theme.breakpoints.up('md')]: {
      height: '11rem',
    },
  },
  quoteIcon: {
    transform: 'rotate(180deg)',
    fontSize: '3rem',
  },
  mobileStepper: {
    backgroundColor: 'inherit',
  },
}));

function StoryStepper() {
  const theme = useTheme();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);
  const handleStepChange = step => setActiveStep(step);

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={5000}
      >
        {steps.map((step, i) => (
          <div key={step.quotation}>
            {Math.abs(activeStep - i) <= 1 ? (
              <article className={classes.story}>
                <FormatQuote color="primary" className={classes.quoteIcon} />
                <Typography variant="subtitle1">{step.quotation}</Typography>
                <br />
                <Typography variant="overline">
                  —
                  {step.author}
                </Typography>
              </article>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        className={classes.mobileStepper}
        nextButton={(
          <Button onClick={handleNext} disabled={activeStep === maxSteps - 1} aria-label="Next quotation">
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        )}
        backButton={(
          <Button onClick={handleBack} disabled={activeStep === 0} aria-label="Previous quotation">
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </Button>
        )}
      />
    </div>
  );
}

export default StoryStepper;
