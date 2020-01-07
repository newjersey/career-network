import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import DateCompleted from '../DateCompleted';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: theme.palette.background.info,
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  cardTitle: {
    fontSize: '1rem',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export default function ProgressFeedItem(props) {
  const classes = useStyles();
  const { title, subheader, date, timeSpentInMinutes, icon } = props;

  return (
    <Card className={classes.card} data-intercom="progress-feed-item">
      <CardContent className={classes.cardContent}>
        <Box display="flex" justify="space-between" width={1}>
          <Box flexGrow={1}>
            {subheader && (
              <Typography variant="body2" component="h2" gutterBottom>
                {subheader}
              </Typography>
            )}
          </Box>
          <Box>{icon}</Box>
        </Box>
        <Typography variant="h6" component="h2" className={classes.cardTitle}>
          {title}
        </Typography>
        <Divider className={classes.divider} />
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <DateCompleted variant="body2">{date}</DateCompleted>
          </Grid>
          <Grid item>
            {timeSpentInMinutes && (
              <Typography variant="body2">
                <span role="img" aria-label="Clock">
                  ⏰
                </span>
                {timeSpentInMinutes} Minutes
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

ProgressFeedItem.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  date: FirebasePropTypes.timestamp.isRequired,
  timeSpentInMinutes: PropTypes.number,
  icon: PropTypes.element,
};

ProgressFeedItem.defaultProps = {
  icon: null,
  subheader: null,
  timeSpentInMinutes: null,
};
