import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import DateCompleted from '../DateCompleted';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  cardHeaderTitle: {
    fontSize: '1.2rem',
  },
  cardContent: {
    paddingTop: 0,
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
}));

export default function FeedCard(props) {
  const classes = useStyles();
  const { title, subheader, date, timeSpentInMinutes, icon, cardType } = props;

  return (
    <Card className={classes.card} data-intercom={cardType}>
      <CardHeader
        title={title}
        titleTypographyProps={{ component: 'h2' }}
        subheader={subheader}
        classes={{ title: classes.cardHeaderTitle }}
        action={icon}
      />
      <CardContent className={classes.cardContent}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <DateCompleted variant="body2">{date}</DateCompleted>
          </Grid>
          <Grid item>
            {timeSpentInMinutes && (
              <Typography variant="body2">
                <span role="img" aria-label="Clock">
                  🕒
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

FeedCard.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  date: FirebasePropTypes.timestamp.isRequired,
  timeSpentInMinutes: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired,
};
