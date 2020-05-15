import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import EmailIcon from '@material-ui/icons/Email';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';
import UserClass from '../../src/User';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
  },
  cardHeader: {
    marginBottom: theme.spacing(1),
  },
  cardContent: {
    padding: theme.spacing(1),
  },
  avatar: {
    width: 56,
    height: 56,
    border: `4px solid ${theme.palette.primary.main}`,
  },
  info: {
    marginLeft: theme.spacing(1),
  },
  lightButtonRoot: {
    backgroundColor: 'RGBA(24,129,197,0.06)',
  },
  lightButtonLabel: {
    color: '#1881C5',
  },
}));

function UserProfileCard({ user, phoneNumber, onButtonClick, editMode }) {
  const classes = useStyles();
  const { photoURL, displayName, email } = user;

  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Grid container alignItems="center" spacing={1} className={classes.cardHeader}>
            <Grid item>
              <Avatar src={photoURL} alt={displayName} className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h6" gutterBottom>
                {displayName}
              </Typography>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" />
          <Box display="flex" alignItems="center" mt={3}>
            <EmailIcon />
            <Typography className={classes.info} variant="body2" color="textSecondary">
              {email}
            </Typography>
          </Box>
          {phoneNumber && (
            <Box display="flex" alignItems="center" mt={2}>
              <PhoneIcon />
              <Typography className={classes.info} variant="body2" color="textSecondary">
                {phoneNumber}
              </Typography>
            </Box>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <Button
            fullWidth
            variant="contained"
            size="large"
            classes={{ root: classes.lightButtonRoot, label: classes.lightButtonLabel }}
            onClick={onButtonClick}
          >
            {editMode ? 'SAVE PROFILE UPDATES' : 'EDIT MY PROFILE'}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

UserProfileCard.propTypes = {
  user: PropTypes.instanceOf(UserClass).isRequired,
  phoneNumber: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

UserProfileCard.defaultProps = {
  phoneNumber: null,
};

export default UserProfileCard;
