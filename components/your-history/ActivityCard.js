import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';

import Divider from '@material-ui/core/Divider';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function ActivityCard(props) {
  const classes = useStyles();

  const {
    activityType,
    description,
    dateCompleted,
    timeSpentInMinutes,
    difficultyLevel,
    activityFeeling,
    whyIfeelThisWay,
  } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {activityType}
        </Typography>
        <Typography variant="h5" component="h2">
          {description}
        </Typography>
        <Typography variant="body2" component="p">
          longer description
        </Typography>
        <Divider variant="middle" />
        <Box>
          <Box>
            <Typography variant="overline">Completed On</Typography>
            <Typography variant="body2">{dateCompleted}</Typography>
          </Box>
          <Box>
            <Typography variant="overline">Difficulty</Typography>
            <Typography variant="body2">{difficultyLevel}</Typography>
          </Box>
          <Box>
            <Typography variant="overline">Estimated Time</Typography>
            <Typography variant="body2">{timeSpentInMinutes} Minutes</Typography>
          </Box>
        </Box>
        <Typography>{activityFeeling}</Typography>
        <Typography>{whyIfeelThisWay}</Typography>
      </CardContent>
    </Card>
  );
}

ActivityCard.propTypes = {
  activityType: PropTypes.string,
  description: PropTypes.string.isRequired,
  dateCompleted: PropTypes.instanceOf(Date),
  timeSpentInMinutes: PropTypes.number,
  difficultyLevel: PropTypes.string,
  activityFeeling: PropTypes.string,
  whyIfeelThisWay: PropTypes.string,
};

ActivityCard.defaultProps = {
  activityType: '',
  dateCompleted: null,
  timeSpentInMinutes: null,
  difficultyLevel: '',
  activityFeeling: '',
  whyIfeelThisWay: '',
};

export default ActivityCard;
