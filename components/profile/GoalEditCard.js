import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(1),
  },
  title: {
    color: theme.palette.background.dark,
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
}));

function GoalEditCard({ value, onChange }) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography className={classes.title} component="h2" variant="h6">
            My Goal
          </Typography>
          <Typography variant="body2">
            You can update your goal from your profile as your job search evolves. Your answer won’t
            be shown to others.
          </Typography>
          <TextField
            variant="outlined"
            value={value}
            onChange={onChange}
            multiline
            rows={6}
            fullWidth
            className={classes.textField}
          />
        </CardContent>
      </Card>
    </>
  );
}

GoalEditCard.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GoalEditCard;
