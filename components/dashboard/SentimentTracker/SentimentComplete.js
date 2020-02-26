import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shuffle from 'lodash/fp/shuffle';
import Typography from '@material-ui/core/Typography';

const SENTIMENT_TYPES = {
  Motivated: {
    messages: [
      'Fantastic! What have you been putting off doing that you could do today?',
      'That’s great! Use this motivation to try something out of your comfort zone today. Where can you take your job search today?',
      'Glad to hear it! Consider how you could push your limits today.',
      'Wonderful! How can you channel that motivation to create some momentum in your search?',
      'Excellent! It is a great time to make some progress in your job search.',
    ],
  },
  Hopeful: {
    messages: [
      'Great! What’s something new that you could learn today?',
      'Fantastic! Today could be a great day to make some progress in your job search.',
      'That’s good to hear! How can you use your hopefulness to create some momentum for your search?',
      'Awesome! How can your hopefulness guide your choices today?',
      'Wonderful! There are good things to come. Consider how you can make strides in your job search today.',
    ],
  },
  Okay: {
    messages: [
      'We hear you! Consider what you could do to give your day a boost.',
      'We get it. It can help to find a quick win. What’s something you could do right now that would give you a sense of accomplishment?',
      'Feeling “just OK” is pretty common. What could you do to make your job search more interesting today?',
      'We understand how you’re feeling. Try to channel your energy into doing at least one productive thing for your job search today. ',
      'That’s very normal. Throughout your day try doing things that can help energize you--listen to your favorite music, get moving, or start some other activity that revitalizes your mind and body.',
    ],
  },
  Discouraged: {
    messages: [
      'It’s normal to feel discouraged during your search. What can you do to lift your mood today? Throughout your day proactively address your mood by doing things, such as changing your scenery, calling a loved one, or going for a walk, in order to bring a new perspective to your day.',
      'Some days are better than others. If you are feeling low, you will have to actively try to pull yourself up to be able to make progress today. What is one thing you can try to accomplish?',
      'We understand why you feel that way. Job search is a difficult process, but try not to let your mood get in the way of making progress in your search. How can you gain some momentum in your search today?',
      'Job search is hard and can easily get you down. You need a reminder of how strong and resilient you are. When you need to feel some inner courage, what reminds you of your inner strength? Consider this as you move throughout your day. ',
      'We get it. Write it down. Take a minute to write about your discouragement--what it feels like, why you’re feeling discouraged. Describe it in as much detail as you can to acknowledge your feelings and then move on. Today is about you making progress.',
      'We hear you. Disappointment and discouragement happens when our expectations of what "should" happen or what we hope will happen aren\'t fulfilled. How can you acknowledge and move past this feeling today?',
    ],
  },
  Worried: {
    messages: [
      'Sometimes your worries about the future can sap your motivation. Consider how you can minimize your worries so that you can make strides in your job search today.',
      'Being worried is normal. Is it causing you to feel like you are off-track? What do you do when this happens? Throughout your day, take steps to bring yourself back to center so that you can move yourself forward.',
      'Job search can be unsettling. By breaking down your next steps, you can sail through executing on small wins, which will add up to a lot of progress.',
      'We hear you. It is important to try to minimize the worry in order to focus on the steps in front of you. Today is a great day to take action.',
      "Worrying about things you can't control can unnecessarily deplete your momentum. Don’t let it derail your day!",
    ],
  },
};

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
  },
  container: {
    padding: theme.spacing(6, 4, 6, 5),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 2, 6, 4),
    },
  },
  title: {
    maxWidth: '75%',
    fontSize: '1.1rem',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: theme.palette.grey[500],
  },
}));

export default function SentimentComplete(props) {
  const classes = useStyles();
  const { onClose, value } = props;
  const [shuffledMessages] = useState(shuffle(SENTIMENT_TYPES[value].messages));

  return (
    <Paper className={classes.paper} elevation={3}>
      <Box position="relative" className={classes.container}>
        <Typography variant="h6" className={classes.title} gutterBottom>
          {shuffledMessages[0]}
        </Typography>
        <Typography variant="body1">
          Here is one place to get started. Take action on your first goal. Let&apos;s dive in
          together!
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

SentimentComplete.propTypes = {
  onClose: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
