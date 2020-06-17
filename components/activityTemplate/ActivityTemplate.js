import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Header from './Header';

const useStyles = makeStyles(theme => ({
  section: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
  },
}));

export default function ActivityTemplate(props) {
  const classes = useStyles();
  const { activityTemplate, templateId } = props;
  const { category, milestone, title } = activityTemplate;
  return (
    <div className={classes.root}>
      Activity Template: {templateId}
      <Header category={category} milestone={milestone} title={title} />
      <Grid xs={12}>{JSON.stringify(activityTemplate)}</Grid>
    </div>
  );
}

ActivityTemplate.propTypes = {
  activityTemplate: PropTypes.objectOf(PropTypes.any).isRequired,
  templateId: PropTypes.string.isRequired,
};
