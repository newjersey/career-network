import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import isEmpty from 'lodash/isEmpty';
import DoneIcon from '@material-ui/icons/Done';

const PRACTIC_SECTION_COLOR = '#d09d09';

const useStyles = makeStyles(theme => ({
  stepContent: {
    marginTop: 8,
    marginLeft: 20, // half icon
    paddingLeft: 8 + 30, // margin + one and half icon
    paddingRight: 8,
    borderLeft: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
    }`,
  },
  last: {
    borderLeft: 'none',
  },
  iconContainer: {
    color: PRACTIC_SECTION_COLOR,
    border: `2px solid ${PRACTIC_SECTION_COLOR}`,
    borderRadius: '50%',
    padding: theme.spacing(0.6),
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
  },
  card: {
    marginTop: -45,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const QuestionItem = ({ index, title, isLast }) => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleChange = event => {
    event.persist();
    setValue(event.target.value);
  };

  const handleFocus = () => {
    setInProgress(true);
  };

  const handleBlur = () => {
    setInProgress(false);
    setComplete(!isEmpty(value));
  };

  return (
    <>
      {index !== 0 && <StepConnector style={{ marginLeft: 20 }} orientation="vertical" />}
      <span
        className={classes.iconContainer}
        style={{
          color: inProgress || complete ? 'white' : PRACTIC_SECTION_COLOR,
          backgroundColor: inProgress || complete ? PRACTIC_SECTION_COLOR : 'white',
        }}
      >
        {!complete ? <b>{index + 1}</b> : <DoneIcon />}
      </span>
      <div className={clsx(classes.stepContent, isLast && classes.last)}>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <Typography className={classes.title}>{title}</Typography>
            <TextField
              variant="outlined"
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
              onChange={handleChange}
              fullWidth
              multiline
              rows={5}
              placeholder="Enter your thoughts here"
            />
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
