import { makeStyles } from '@material-ui/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import NextLink from 'next/link';
import PersonIcon from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';
import Picture from '../Picture';
import ScaffoldContainer from '../ScaffoldContainer';
import UserClass from '../../src/User';

const logoRatio = 1;
const logoWidths = {
  xs: 40,
  md: 60,
};

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-end',
    },
  },
  logo: {
    position: 'relative',
    top: '4px',
    margin: '.8em .8em .8em 0',
    width: logoWidths.xs,
    height: logoWidths.xs * logoRatio,
    [theme.breakpoints.up('md')]: {
      width: logoWidths.md,
      height: logoWidths.md * logoRatio,
    },
  },
  titleContainer: {
    flexBasis: 0,
    [theme.breakpoints.down('sm')]: {
      flexBasis: 'auto',
    },
  },
  title: {
    fontSize: '1.5em',
    fontWeight: 300,
    cursor: 'pointer',
  },
  list: {
    display: 'flex',
    justifyContent: 'flex-end',
    listStyle: 'none',
  },
  link: {
    padding: theme.spacing(1, 3.5),
    color: '#000',
    cursor: 'pointer',
    width: '100%',
    display: 'inline-block',
    '&:hover': {
      backgroundColor: '#e4e4e4',
    },
  },
  drawerList: {
    width: 250,
  },
}));

function Nav(props) {
  const { onSignOut, user } = props;
  const classes = useStyles();
  const { showSignIn, userDocRef } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const handleSignInClick = () => showSignIn();
  const handleHelpClick = () => window.Intercom('show');
  const onEditAssessment = () => {
    userDocRef.set({ isAssessmentComplete: false }, { merge: true });
    Router.push('/assessment');
  };

  const pages = [
    {
      href: '/assessment',
      name: 'Questionnaire',
      show: user && !user.isCoach && !user.isAssessmentComplete,
    },
    {
      href: '/dashboard',
      name: 'My Dashboard',
      show: user && !user.isCoach && user.isAssessmentComplete,
    },
    {
      href: '/toolkit',
      name: 'Job Toolkit',
      shortName: 'Toolkit',
      show: false,
    },
    {
      href: '/resources',
      name: 'State Resources',
      shortName: 'Resources',
      show: false,
    },
    {
      href: '/coach-assignments',
      name: 'Coach Assignments',
      shortName: 'Coaches',
      show: user && user.isAdmin,
    },
    {
      href: '/coaching',
      name: 'Coaching',
      shortName: 'Coaching',
      show: user && user.isCoach,
    },
    {
      href: '/about',
      name: 'About',
      shortName: 'About',
      show: true,
    },
    {
      href: '',
      name: 'Help',
      shortName: 'Help',
      show: true,
      onClick: handleHelpClick,
    },
  ];

  return (
    <>
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
        <div tabIndex={0} role="button" onClick={closeDrawer} onKeyDown={closeDrawer}>
          <div className={classes.drawerList}>
            <Hidden smUp implementation="js">
              <List>
                {user ? (
                  <>
                    <NextLink href="/dashboard">
                      <ListItem button>
                        <ListItemIcon>
                          <Avatar src={user.photoURL} alt={user.displayName}>
                            <PersonIcon />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={user.displayName} secondary={user.email} />
                      </ListItem>
                    </NextLink>
                    {user.isAssessmentComplete ? (
                      <NextLink href="/dashboard">
                        <ListItem button>
                          <ListItemIcon>
                            <DashboardIcon />
                          </ListItemIcon>
                          <ListItemText primary="My dashboard" />
                        </ListItem>
                      </NextLink>
                    ) : (
                      <NextLink href="/assessment">
                        <ListItem button>
                          <ListItemIcon>
                            <AssignmentIcon />
                          </ListItemIcon>
                          <ListItemText primary="Questionnaire" />
                        </ListItem>
                      </NextLink>
                    )}
                    <ListItem button onClick={onEditAssessment}>
                      <ListItemIcon>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText primary="Edit assessment" />
                    </ListItem>
                    <ListItem button onClick={onSignOut}>
                      <ListItemIcon>
                        <PowerSettingsNewIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sign out" />
                    </ListItem>
                  </>
                ) : (
                  <ListItem button onClick={handleSignInClick}>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign in" />
                  </ListItem>
                )}
              </List>
              <Divider />
            </Hidden>

            <List>
              {pages
                .filter(page => page.show && page.shortName)
                .map(page => (
                  <NextLink href={page.href} key={page.shortName}>
                    <ListItem button>
                      <ListItemText primary={page.shortName} onClick={page.onClick} />
                    </ListItem>
                  </NextLink>
                ))}
            </List>
          </div>
        </div>
      </Drawer>

      <ScaffoldContainer padding={false}>
        <Grid container justify="space-between" alignItems="center" className={classes.container}>
          <NextLink href="/">
            <Grid item>
              <Grid container alignItems="center">
                <Hidden xsDown implementation="css">
                  <Grid item>
                    <Picture
                      path="nj.webp"
                      fallbackType="png"
                      alt="New Jersey Career Network"
                      className={classes.logo}
                    />
                  </Grid>
                </Hidden>
                <Grid item className={classes.titleContainer}>
                  <Typography variant="h1" color="primary" className={classes.title}>
                    Career Network
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </NextLink>
          <Grid item style={{ flex: 1 }}>
            <Hidden mdUp implementation="css">
              <div style={{ textAlign: 'right' }}>
                <IconButton onClick={openDrawer} aria-label="Menu">
                  <MenuIcon />
                </IconButton>
              </div>
            </Hidden>
            <Hidden smDown implementation="css">
              <nav>
                <ul className={classes.list}>
                  {!user && (
                    <Typography>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <Link
                        className={classes.link}
                        onClick={handleSignInClick}
                        component="button"
                        underline="none"
                        variant="body1"
                      >
                        Get Started Today
                      </Link>
                    </Typography>
                  )}
                  {pages
                    .filter(page => page.show)
                    .map(page => (
                      <li
                        key={page.href}
                        className={classes.listItem}
                        data-intercom={`nav-button-${page.name.replace(/\W/, '-').toLowerCase()}`}
                      >
                        <Typography>
                          <NextLink href={page.href}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link className={classes.link} underline="none" onClick={page.onClick}>
                              {page.name}
                            </Link>
                          </NextLink>
                        </Typography>
                      </li>
                    ))}
                </ul>
              </nav>
            </Hidden>
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </>
  );
}

Nav.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(UserClass),
};

Nav.defaultProps = {
  user: null,
};

export default Nav;
