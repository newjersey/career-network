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
    quotation: 'The New Jerseys Career Network helped me get back on my feet, which after seven months, seemed harder and harder to do. Thanks to the resume builder, I found a few errors, I was able to strengthen my resume and land an interview two weeks later!',
    author: 'Jenny, Database Manager',
  },
  {
    quotation: 'There are no secrets to success. It is the result of preparation, hard work, and learning from failure.',
    author: 'Colin Powell',
  },
  {
    quotation: 'The best way to not feel hopeless is to get up and do something. Don’t wait for good things to happen to you. If you go out and make some good things happen, you will fill the world with hope, you will fill yourself with hope.',
    author: 'Barack Obama',
  },
  {
    quotation: 'Without ambition one starts nothing. Without work one finishes nothing. The prize will not be sent to you. You have to win it.',
    author: 'Ralph Waldo Emerson',
  },
  {
    quotation: 'We often miss opportunity because it\'s dressed in overalls and looks like work.',
    author: 'Thomas Edison',
  },
];

// quick and dirty -- do something better
const longestQuotationLength = steps
  .map(step => step.quotation.length)
  .reduce((a, b) => Math.max(a, b));

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  story: {
    overflow: 'hidden',
    height: `${longestQuotationLength / 13.25}rem`,
    [theme.breakpoints.up('md')]: {
      height: `${longestQuotationLength / 16.25}rem`,
    },
    [theme.breakpoints.up('lg')]: {
      height: `${longestQuotationLength / 18.25}rem`,
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
