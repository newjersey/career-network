import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import ActionIcon from '../dashboard/ActionPlan/ActionIcon';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
    width: '32%',
  },
  iconContainer: {
    padding: theme.spacing(0.8),
    fontSize: '16px',
    marginLeft: theme.spacing(1),
  },
}));

function ActionStatsCard({ actionType, count }) {
  const classes = useStyles();

  return (
    <Card className={classes.card} variant="outlined" style={{ borderColor: actionType.color }}>
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item>
          <ActionIcon {...actionType} iconClassName={classes.iconContainer} />
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            style={{
              color: actionType.color,
            }}
          >
            <b>{count}</b> {actionType.label}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

ActionStatsCard.propTypes = {
  actionType: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  count: PropTypes.number,
};

ActionStatsCard.defaultProps = {
  count: 0,
};

export default ActionStatsCard;
