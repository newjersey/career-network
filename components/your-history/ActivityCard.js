import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
    marginBottom: theme.spacing(2),
  },
  label: {
    lineHeight: 1.2,
  },
  chip: {
    marginRight: theme.spacing(1),
  },
}));

function ActivityCard(props) {
  const classes = useStyles();

  const {
    activityType,
    description,
    dateCompleted,
    timeSpentInMinutes,
    difficultyLevel,
    activityFeeling,
    whyIfeelThisWay,
  } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.group}>
          <Typography variant="body1" component="p" gutterBottom noWrap>
            {activityType}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            {description}
          </Typography>
        </div>
        <div className={classes.group}>
          <Typography variant="body2" component="p">
            longer description
          </Typography>
        </div>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="overline" className={classes.label}>
              Completed On
            </Typography>
            <Typography variant="body1">{dateCompleted}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="overline" className={classes.label}>
              Difficulty
            </Typography>
            <Typography variant="body1">{difficultyLevel}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="overline" className={classes.label}>
              Estimated Time
            </Typography>
            <Typography variant="body1" component="span" display="block">
              {timeSpentInMinutes} Minutes
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <div className={classes.group}>
          <Typography variant="overline">I felt...</Typography>
          <Grid>
            {activityFeeling.map(feeling => (
              <Chip key={feeling} label={feeling} className={classes.chip} />
            ))}
          </Grid>
        </div>
        <div className={classes.group}>
          <Typography variant="overline" className={classes.label}>
            I felt like this because...
          </Typography>
          <Typography variant="body2" component="p">
            {whyIfeelThisWay}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

ActivityCard.propTypes = {
  activityType: PropTypes.string,
  description: PropTypes.string.isRequired,
  dateCompleted: PropTypes.instanceOf(Date),
  timeSpentInMinutes: PropTypes.number,
  difficultyLevel: PropTypes.string,
  activityFeeling: PropTypes.arrayOf(PropTypes.string),
  whyIfeelThisWay: PropTypes.string,
};

ActivityCard.defaultProps = {
  activityType: '',
  dateCompleted: null,
  timeSpentInMinutes: null,
  difficultyLevel: '',
  activityFeeling: [],
  whyIfeelThisWay: '',
};

export default ActivityCard;
