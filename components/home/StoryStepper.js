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
    quotation: 'The best advice I can give them is not to give up. Giving up is easy; moving forward through obstacles is hard. You can have the best resume, the most impressive background, and the sharpest interview skills, but there is no tool more important to the job search than perseverance.',
    author: 'New Jersey Job Seeker',
  },
  {
    quotation: 'One important key to success is self-confidence. An important key to self-confidence is preparation.',
    author: 'Arthur Ashe',
  },
  {
    quotation: 'Never stop growing a useful professional network, ask for help if you need it, and dedicate yourself to do something that moves you towards employment.',
    author: 'New Jersey Job Seeker',
  },
  {
    quotation: 'Success doesn’t come to you, you go to it.',
    author: 'Marva Collins',
  },
  {
    quotation: 'Be ready to put the time in. Be honest with yourself about what areas you need to work on, such as interviewing or your resume, and do it! If you want the job, show your interest, and find ways to make parallels between what the company is looking for and what you can offer.',
    author: 'New Jersey Job Seeker',
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
