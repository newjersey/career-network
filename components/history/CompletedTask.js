import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import VpnKey from '@material-ui/icons/VpnKey';

import AirtablePropTypes from '../Airtable/PropTypes';

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
    position: 'relative',
  },
  description: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

function CompleteTask(props) {
  const classes = useStyles();

  const { categoryName, title, why, dateCompleted } = props;
  const category = categoryName && AirtablePropTypes.findTaskCategory(categoryName);

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.header}>
          {category && (
            <Chip
              size="small"
              label={category.name}
              className={classes.type}
              style={{ backgroundColor: category.color }}
            />
          )}
          <VpnKey style={{ position: 'absolute', right: 0 }} />
        </div>

        <Typography variant="h6" component="h2" className={classes.group}>
          {title}
        </Typography>

        <Typography variant="body2" component="p" className={classes.description}>
          <Typography component="span" style={{ fontWeight: 'bold' }}>
            Why?{' '}
          </Typography>
          {why}
        </Typography>
        <Grid container className={classes.group}>
          <Grid item xs={4}>
            <Typography variant="body2" className={classes.label}>
              Completed On
            </Typography>
            <Typography variant="body1">{dateCompleted}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

CompleteTask.propTypes = {
  categoryName: PropTypes.string,
  dateCompleted: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  why: PropTypes.string.isRequired,
};

CompleteTask.defaultProps = {
  categoryName: undefined,
};

export default CompleteTask;
