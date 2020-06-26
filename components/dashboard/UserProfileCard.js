import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import NextLink from 'next/link';
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
  lightButtonRoot: {
    backgroundColor: 'RGBA(24,129,197,0.06)',
  },
  lightButtonLabel: {
    color: '#1881C5',
  },
}));

function UserProfileCard({ user }) {
  const classes = useStyles();
  const { photoURL, displayName } = user;

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
                {user.displayName}
              </Typography>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" />
          {user.userData && user.userData.userProfile && user.userData.userProfile.goal && (
            <Box mt={2}>
              <Typography variant="body1" component="p">
                {user.userData.userProfile.goal}
              </Typography>
            </Box>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <NextLink href="/profile">
            <Button
              fullWidth
              variant="contained"
              size="large"
              classes={{ root: classes.lightButtonRoot, label: classes.lightButtonLabel }}
            >
              View My Profile
            </Button>
          </NextLink>
        </CardActions>
      </Card>
    </>
  );
}

UserProfileCard.propTypes = {
  user: PropTypes.instanceOf(UserClass).isRequired,
};

export default UserProfileCard;
