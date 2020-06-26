import { makeStyles } from '@material-ui/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
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
import Typography from '@material-ui/core/Typography';
import { Flags } from 'react-feature-flags';
import { useAuth } from '../Auth';
import Picture from '../Picture';
import ScaffoldContainer from '../ScaffoldContainer';
import UserButton from './UserButton';
import SignInButton from './SignInButton';
import UserClass from '../../src/User';
import featureFlags from '../../src/feature-flags';
import NavLink from './NavLink';

const logoRatio = 1;
const logoWidths = {
  xs: 40,
  md: 60,
};

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
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
    cursor: 'pointer',
  },
  list: {
    display: 'flex',
    justifyContent: 'flex-start',
    listStyle: 'none',
    paddingLeft: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '100%',
    padding: theme.spacing(0, 1),
  },
  link: {
    padding: theme.spacing(0, 1),
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    borderBottomStyle: 'solid',
    color: '#000',
    cursor: 'pointer',
    width: '100%',
    height: '60%',
    display: 'inline-block',
    fontSize: '1rem',
  },
  activePageLink: {
    borderBottomColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
    fontWeight: 600,
  },
  drawerList: {
    width: 250,
  },
  navContent: {
    display: 'flex',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
}));

function Nav(props) {
  const { onSignOut, user } = props;
  const classes = useStyles();
  const { showSignIn } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const handleSignInClick = () => showSignIn();
  const handleHelpClick = () => window.Intercom('show');

  const showApplicationTracker = !!featureFlags.find(
    flag => flag.name === 'applicationTracker' && flag.isActive
  );

  const showJobSearchBasics = !!featureFlags.find(
    flag => flag.name === 'jobSearchBasics' && flag.isActive
  );

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
      href: '/application-tracker',
      name: 'Application Tracker',
      show: user && showApplicationTracker,
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
      href: '/job-search-basics',
      name: 'The Basics',
      shortName: 'The Basics',
      show: showJobSearchBasics,
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
    {
      href: '/covid-resources',
      name: 'COVID-19',
      shortName: 'COVID-19',
      show: true,
    },
  ];

  return (
    <>
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
        <div tabIndex={0} role="button" onClick={closeDrawer} onKeyDown={closeDrawer}>
          <div className={classes.drawerList}>
            <Hidden mdUp implementation="js">
              <List>
                {user && (
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
                          <ListItemText primary="My Dashboard" />
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
                    <Flags authorizedFlags={['userProfile']}>
                      <NextLink href="/profile">
                        <ListItem button>
                          <ListItemIcon>
                            <PersonIcon />
                          </ListItemIcon>
                          <ListItemText primary="My Profile" />
                        </ListItem>
                      </NextLink>
                    </Flags>
                    <Flags authorizedFlags={['applicationTracker']}>
                      <NextLink href="/application-tracker">
                        <ListItem button>
                          <ListItemIcon>
                            <AssignmentIcon />
                          </ListItemIcon>
                          <ListItemText primary="Application Tracker" />
                        </ListItem>
                      </NextLink>
                    </Flags>
                    <Flags authorizedFlags={['jobSearchBasics']}>
                      <NextLink href="/job-search-basics">
                        <ListItem button>
                          <ListItemIcon>
                            <AssignmentIcon />
                          </ListItemIcon>
                          <ListItemText primary="The Basics" />
                        </ListItem>
                      </NextLink>
                    </Flags>
                  </>
                )}
              </List>
              <Divider />
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
                <Divider />
                {user ? (
                  <ListItem button onClick={onSignOut}>
                    <ListItemIcon>
                      <PowerSettingsNewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign out" />
                  </ListItem>
                ) : (
                  <ListItem button onClick={handleSignInClick}>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign in" />
                  </ListItem>
                )}
              </List>
            </Hidden>
          </div>
        </div>
      </Drawer>

      <ScaffoldContainer>
        <Grid
          container
          wrap="nowrap"
          justify="flex-start"
          alignItems="center"
          className={classes.container}
        >
          <Grid container item xs>
            <NextLink href={user ? '/dashboard' : '/'}>
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
                    <Typography variant="h5" color="primary" className={classes.title}>
                      Career Network
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </NextLink>
            <Hidden smDown implementation="css">
              <Grid item>
                <nav className={classes.navContent}>
                  <ul className={classes.list}>
                    {pages
                      .filter(page => page.show)
                      .map(page => (
                        <li
                          key={page.href}
                          className={classes.listItem}
                          data-intercom={`nav-button-${page.name.replace(/\W/, '-').toLowerCase()}`}
                        >
                          <NavLink activeClassName={classes.activePageLink} href={page.href}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link className={classes.link} underline="none" onClick={page.onClick}>
                              {page.name}
                            </Link>
                          </NavLink>
                        </li>
                      ))}
                  </ul>
                </nav>
              </Grid>
            </Hidden>
          </Grid>

          <Hidden smDown implementation="css">
            <Grid container item xs>
              {user ? (
                <UserButton
                  displayName={user.displayName}
                  email={user.email}
                  onSignOut={onSignOut}
                  photoURL={user.photoURL}
                  isAssessmentComplete={user.isAssessmentComplete}
                />
              ) : (
                <SignInButton />
              )}
            </Grid>
          </Hidden>
          <Hidden mdUp implementation="css">
            <div style={{ textAlign: 'right' }}>
              <IconButton onClick={openDrawer} aria-label="Menu">
                <MenuIcon />
              </IconButton>
            </div>
          </Hidden>
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
