import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';

import ActionList from './ActionList';
import AirtablePropTypes from '../Airtable/PropTypes';

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

  return (
    <Card style={{ marginBottom: '2em' }}>
      <CardHeader
        title={
          <Typography component="h2" variant="h3">
            <strong>{task.fields.Title}</strong>
          </Typography>
        }
        subheader={`🕒${task.fields['Time Estimate']} min.`}
      />
      <CardContent>
        <Chip
          size="small"
          label={task.fields.Category}
          style={{ backgroundColor: bgColor(task) }}
        />

        <br />
        <br />

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
