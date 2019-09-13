import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';

import ActionList from './ActionList';
import AirtablePropTypes from '../Airtable/PropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3, 3, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4, 4, 1),
    },
  },
}));

function bgColor(task) {
  return {
    'Marketing Yourself': '#d0f0fd',
    'Relationship Building': '#d2f7c5',
    'Searching / Posting / Applying Online': '#ffeab6',
    'Researching People & Companies': '#ffdce5',
  }[task.fields.Category];
}

export default function Task(props) {
  const { task, ...restProps } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography component="h1" variant="h2">
            <strong>{task.fields.Title}</strong>
          </Typography>
        }
      />
      <CardContent>
        {task.fields.Category && (
          <Chip
            size="small"
            label={task.fields.Category}
            style={{ backgroundColor: bgColor(task) }}
          />
        )}
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <div>🕒{task.fields['Time Estimate']} min.</div>

        <Typography variant="h5" component="h3" gutterBottom>
          Why?
        </Typography>
        <Typography variant="body1" component="p">
          {task.fields.Why}
        </Typography>

        <br />
        <br />

        <Typography variant="h5" component="h3">
          How?
        </Typography>
        <ActionList task={task} {...restProps} />
      </CardContent>
    </Card>
  );
}

Task.propTypes = {
  actions: AirtablePropTypes.actions.isRequired,
  task: AirtablePropTypes.task.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
};
