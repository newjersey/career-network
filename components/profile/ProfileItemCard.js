import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(3, 2, 2),
  },
  cardContent: {
    padding: theme.spacing(1),
  },
}));

function ProfileItemCard({ title, description }) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <CardHeader
            title={
              <Box display="flex" justifyContent="center">
                <Typography variant="h6" gutterBottom>
                  {title}
                </Typography>
              </Box>
            }
          />
          <Box display="flex" justifyContent="center">
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

ProfileItemCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProfileItemCard;
