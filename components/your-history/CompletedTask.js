import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import FirebasePropTypes from '../Firebase/PropTypes';

function getFormattedDateCompleted(date) {
  return format(date, 'MMMM do');
}

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    padding: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  group: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  label: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  description: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

function CompleteTask(props) {
  const classes = useStyles();

  const { category, title, why, dateCompleted } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.header}>
          <Typography variant="body1" noWrap style={{ maxWidth: '75%', fontWeight: 500 }}>
            {category}
          </Typography>
          <Typography variant="caption" component="p" noWrap>
            icon
          </Typography>
        </div>

        <Typography variant="h6" component="h2" className={classes.group}>
          {title}
        </Typography>
        <Typography variant="body2" component="p" className={classes.description}>
          {why}
        </Typography>
        <Grid container className={classes.group}>
          <Grid item xs={4}>
            <Typography variant="body2" className={classes.label}>
              Completed On
            </Typography>
            <Typography variant="body1">{getFormattedDateCompleted(dateCompleted)}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

CompleteTask.propTypes = {
  category: PropTypes.string,
  dateCompleted: FirebasePropTypes.timestamp,
  title: PropTypes.string,
  why: PropTypes.string,
};

CompleteTask.defaultProps = {
  category: '',
  dateCompleted: null,
  title: '',
  why: '',
};

export default CompleteTask;
