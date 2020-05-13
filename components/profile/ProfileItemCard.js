import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(1),
  },
  title: {
    color: theme.palette.background.dark,
    marginBottom: theme.spacing(2),
  },
}));

function ProfileItemCard({ title, items, type }) {
  const classes = useStyles();
  const experience = item => {
    if (type === 'educationItems') {
      return `${item['study-field']} at ${item.school}`;
    }
    return `${item.title} at ${item.org}`;
  };

  const dates = item => {
    if (type === 'educationItems') {
      return `${item['education-start-year']} - ${item['education-end-year']}`;
    }
    return `${item['start-month']} ${item['start-year']} - ${item['end-month']} ${item['end-year']}`;
  };

  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography className={classes.title} component="h2" variant="h6">
            {title}
          </Typography>
          <Divider variant="fullWidth" />
          {items.map(item => (
            <Box mt={2}>
              <Typography variant="body1" gutterBottom>
                {experience(item)}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {dates(item)}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

ProfileItemCard.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ProfileItemCard;
