import { makeStyles } from '@material-ui/styles';
import BuildIcon from '@material-ui/icons/Build';
import ChatIcon from '@material-ui/icons/Chat';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import LinkIcon from '@material-ui/icons/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import NextLink from 'next/link';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Typography from '@material-ui/core/Typography';

import Picture from '../Picture';
import ScaffoldContainer from '../ScaffoldContainer';

const logoRatio = 834 / 784;
const logoWidths = {
  xs: 40,
  md: 60,
};

const pages = [
  {
    href: '/plan',
    name: 'Build Your Plan',
    shortName: 'Build Your Plan',
    icon: <DashboardIcon />,
  }, {
    href: '/act',
    name: 'Act on Your Plan',
    shortName: 'Act on Your Plan',
    icon: <TrendingUpIcon />,
  }, {
    href: '/coaching',
    name: 'Career Coaching',
    shortName: 'Coaching',
    icon: <ChatIcon />,
  }, {
    href: '/networking',
    name: 'Networking',
    shortName: 'Networking',
    icon: <PeopleIcon />,
  }, {
    href: '/toolkit',
    name: 'Job Toolkit',
    shortName: 'Toolkit',
    icon: <BuildIcon />,
  }, {
    href: '/resources',
    name: 'State Resources',
    shortName: 'Resources',
    icon: <LinkIcon />,
  },
];

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
    listStyle: 'none',
  },
  listItem: {
    flexGrow: 1,
    textAlign: 'center',
  },
  listItemTypography: {
    //    display: 'inline',
  },
  link: {
    paddingTop: '.5em',
    paddingBottom: '.5em',
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

function Nav() {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <React.Fragment>
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
        <div
          tabIndex={0}
          role="button"
          onClick={closeDrawer}
          onKeyDown={closeDrawer}
        >
          <div className={classes.drawerList}>

            <Hidden smUp implementation="css">
              <List>
                <ListItem button>
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Jack Jacobs" secondary="jackjacobs@gmail.com" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><SettingsIcon /></ListItemIcon>
                  <ListItemText primary="My account" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                  <ListItemText primary="Sign out" />
                </ListItem>
              </List>
              <Divider />
            </Hidden>
            <List>
              {pages.map(page => (
                <NextLink href={page.href} key={page.href}>
                  <ListItem button>
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText primary={page.shortName} />
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
                    <Picture path="nj.webp" fallbackType="png" alt="New Jersey Logo" className={classes.logo} />
                  </Grid>
                </Hidden>
                <Grid item className={classes.titleContainer}>
                  <Typography variant="h1" color="primary" className={classes.title}>Career Network</Typography>
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
                  {pages.map(page => (
                    <li key={page.href} className={classes.listItem}>
                      <Typography className={classes.listItemTypography}>
                        <NextLink href={page.href}>
                          { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                          <Link className={classes.link} underline="none">{page.name}</Link>
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
    </React.Fragment>
  );
}

export default Nav;
