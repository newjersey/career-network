import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ScaffoldContainer from './ScaffoldContainer';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import LinkIcon from '@material-ui/icons/Link';
import PeopleIcon from '@material-ui/icons/People';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChatIcon from '@material-ui/icons/Chat';
import BuildIcon from '@material-ui/icons/Build';

const pages = [
  {
    href: '/plan',
    name: 'Build Your Plan',
    shortName: 'Build Your Plan',
    icon: <DashboardIcon />
  }, {
    href: '/act',
    name: 'Act on Your Plan',
    shortName: 'Act on Your Plan',
    icon: <TrendingUpIcon />
  }, {
    href: '/coaching',
    name: 'Career Coaching',
    shortName: 'Coaching',
    icon: <ChatIcon />
  }, {
    href: '/networking',
    name: 'Networking',
    shortName: 'Networking',
    icon: <PeopleIcon />
  }, {
    href: '/toolkit',
    name: 'Job Toolkit',
    shortName: 'Toolkit',
    icon: <BuildIcon />
  }, {
    href: '/resources',
    name: 'State Resources',
    shortName: 'Resources',
    icon: <LinkIcon />
  }
];

const styles = theme => ({
  container: {
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-end',
    },
  },
  logo: {
    position: 'relative',
    top: '4px',
    margin: '.8em .8em .8em 0',
    width: '40px',
    [theme.breakpoints.up('md')]: {
      width: '60px',
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
    cursor: 'pointer'
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
      backgroundColor: '#e4e4e4'
    },
  },
  drawerList: {
    width: 250,
  },
});

class Nav extends React.Component {
  state = {
    isDrawerOpen: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      isDrawerOpen: open,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Drawer anchor="right" open={this.state.isDrawerOpen} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <div className={classes.drawerList}>

              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {pages.map(page => (
                  <ListItem button key={page.href}>
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText primary={page.shortName} />
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </Drawer>

        <ScaffoldContainer>
          <Grid container justify="space-between" alignItems="center" className={classes.container}>
            <NextLink href='/'>
              <Grid item>
                <Grid container alignItems="center">
                  <Hidden xsDown implementation="css">
                    <Grid item>
                      <img src="/static/img/nj.png" alt="New Jersey Logo" className={classes.logo} />
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
                  <IconButton onClick={this.toggleDrawer(true)} aria-label="Menu">
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
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);