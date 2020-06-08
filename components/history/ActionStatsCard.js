import { makeStyles, fade } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import ActionIcon from '../dashboard/ActionPlan/ActionIcon';

const useStyles = makeStyles(theme => ({
  card: {
    width: '32%',
    borderColor: ({ actionType }) => actionType.color,
  },
  selected: {
    backgroundColor: ({ actionType }) => fade(actionType.color, 0.06),
  },
  iconContainer: {
    padding: theme.spacing(0.8),
    fontSize: '16px',
    marginLeft: theme.spacing(1),
  },
  cardContent: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: ({ actionType }) => fade(actionType.color, 0.06),
    },
  },
}));

function ActionStatsCard(props) {
  const classes = useStyles(props);
  const { actionType, count, handleSelect, selected } = props;

  const handleClick = () => (selected ? handleSelect() : handleSelect(actionType.value));

  return (
    <Card className={classes.card} variant="outlined">
      <CardActionArea
        onClick={handleClick}
        classes={{
          root: clsx(classes.cardContent, selected && classes.selected),
          focusHighlight: '',
        }}
        disableRipple
      >
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
      </CardActionArea>
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
  handleSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

ActionStatsCard.defaultProps = {
  count: 0,
  selected: false,
};

export default ActionStatsCard;
