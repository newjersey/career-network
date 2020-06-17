import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

const COLOR = '#d09d09';

const useStyles = makeStyles(theme => ({
  stepContent: {
    marginTop: 8,
    marginLeft: 12, // half icon
    paddingLeft: 8 + 12, // margin + half icon
    paddingRight: 8,
    borderLeft: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
    }`,
  },
  last: {
    borderLeft: 'none',
  },
  iconContainer: {
    color: COLOR,
    border: `2px solid ${COLOR}`,
    borderRadius: '50%',
    padding: theme.spacing(0.8),
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const QuestionItem = ({ index, title, isLast }) => {
  const classes = useStyles();

  return (
    <>
      {index !== 0 && <StepConnector orientation="vertical" />}
      <span className={classes.iconContainer}>
        <span>{index + 1}</span>
      </span>
      <div className={clsx(classes.stepContent, isLast && classes.last)}>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <Typography className={classes.title}>{title}</Typography>
            <TextField variant="outlined" fullWidth placeholder="Enter your thoughts here" />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

QuestionItem.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
};

export default QuestionItem;
