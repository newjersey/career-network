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

function ProfileItemCard({ title, items, type, editMode, handleEdit, handleAdd }) {
  const classes = useStyles();
  const experience = item => {
    const role = type === 'educationItems' ? item['study-field'] : item.title;
    const place = type === 'educationItems' ? item.school : item.org;
    if (role && place) {
      return `${role} at ${place}`;
    }
    return null;
  };

  const dates = item => {
    const start = type === 'educationItems' ? item['education-start-year'] : item.start;
    const end = type === 'educationItems' ? item['education-end-year'] : item.end;
    if (start) {
      return end ? `${start} - ${end}` : `${start} - current`;
    }
    return null;
  };

  const itemsWithIds = items.map((item, index) => ({
    ...item,
    id: `${Object.keys(item)[0]}-${index}`,
  }));

  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography className={classes.title} component="h2" variant="h6">
            {title}
          </Typography>
          {!editMode && <Divider variant="fullWidth" />}
          {itemsWithIds.map((item, index) => (
            <React.Fragment key={item.id}>
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
                      <Button variant="contained" onClick={() => handleEdit(index)}>
                        EDIT
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              )}
            </React.Fragment>
          ))}
        </CardContent>
        <CardActions disableSpacing>
          {editMode && (
            <Button className={classes.button} variant="contained" fullWidth onClick={handleAdd}>
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
  handleEdit: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};

export default ProfileItemCard;
