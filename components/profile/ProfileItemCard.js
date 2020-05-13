import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(1),
  },
  title: {
    color: theme.palette.background.dark,
    marginBottom: theme.spacing(2),
  },
  button: {
    color: 'white',
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(1, 8, 1, 8),
  },
  itemCard: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function ProfileItemCard({ title, items, type, editMode }) {
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
    return `${item.start} - ${item.end}`;
  };

  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography className={classes.title} component="h2" variant="h6">
            {title}
          </Typography>
          {!editMode && <Divider variant="fullWidth" />}
          {items.map(item => (
            <>
              {!editMode && (
                <Box mt={2}>
                  <Typography variant="body1" gutterBottom>
                    {experience(item)}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {dates(item)}
                  </Typography>
                </Box>
              )}
              {editMode && (
                <Card className={classes.itemCard} variant="outlined">
                  <Grid container alignItems="center" direction="row" justify="space-between">
                    <Grid item>
                      <Typography variant="body1" gutterBottom>
                        {experience(item)}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {dates(item)}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button variant="contained">EDIT</Button>
                    </Grid>
                  </Grid>
                </Card>
              )}
            </>
          ))}
        </CardContent>
        <CardActions disableSpacing>
          {editMode && (
            <Button className={classes.button} variant="contained" fullWidth>
              Add {title}
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
}

ProfileItemCard.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default ProfileItemCard;
