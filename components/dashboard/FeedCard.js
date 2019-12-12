import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
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
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export default function FeedCard(props) {
  const classes = useStyles();
  const { title, subheader, date, timeSpentInMinutes, icon, cardType } = props;

  return (
    <Card className={classes.card} data-intercom={cardType}>
      <CardHeader
        title={<Typography variant="body1">{subheader}</Typography>}
        titleTypographyProps={{ component: 'h2' }}
        subheader={
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        }
        classes={{ title: classes.cardHeaderTitle }}
        action={icon}
      />
      <CardContent className={classes.cardContent}>
        <Divider className={classes.divider} />
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
  timeSpentInMinutes: PropTypes.string,
  icon: PropTypes.string,
  cardType: PropTypes.string.isRequired,
};

FeedCard.defaultProps = {
  icon: null,
  timeSpentInMinutes: null,
};
