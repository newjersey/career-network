import { autoPlay } from 'react-swipeable-views-utils';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormatQuote from '@material-ui/icons/FormatQuote';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
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

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  story: {
  },
  quoteIcon: {
    transform: 'rotate(180deg)',
    fontSize: '3rem',
  },
  mobileStepper: {
    backgroundColor: 'inherit',
  },
});

class StoryStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = steps.length;

    return (
      <div className={classes.root}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
          interval={5000}
        >
          {steps.map((step, i) => (
            Math.abs(activeStep - i) <= 1 ? (
              <article key={i} className={classes.story}>
                <FormatQuote color="primary" className={classes.quoteIcon} />
                <Typography variant="subtitle1">{step.quotation}</Typography>
                <br />
                <Typography variant="overline">—{step.author}</Typography>
              </article>
            ) : null
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </Button>
          }
        />
      </div>
    );
  }
}

StoryStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(StoryStepper);
