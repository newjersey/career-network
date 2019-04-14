import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../ScaffoldContainer';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    //    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      //      marginLeft: theme.spacing.unit,
      //      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  name: {
    color: 'inherit',
    cursor: 'pointer',
    marginRight: '1em',
  },
  avatar: {
    cursor: 'pointer',
  },
  closeSnackbar: {
    padding: theme.spacing.unit / 2,
  },
});

class User extends React.Component {
  state = {
    anchorEl: null,
    loginOpen: false,
    fullName: 'Jack Jacobs',
    isLoggedIn: true,
    isSnackbarOpen: false,
    snackbarMessage: null,
  };

  handleClickUser = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseUser = () => {
    this.setState({ anchorEl: null });
  };

  handleClickLogin = () => {
    this.setState({ loginOpen: true });
  };

  handleCancelLogin = () => {
    this.setState({
      loginOpen: false,
      fullName: null,
    });
  };

  handleSubmitLogin = () => {
    this.setState({
      loginOpen: false,
      isLoggedIn: true,
    });

    this.showSnackbar('Welcome back!');
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleLogout = () => {
    this.setState({
      fullName: null,
      isLoggedIn: false,
      anchorEl: null
    });

    this.showSnackbar('You have logged out.');
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ isSnackbarOpen: false });
  };

  showSnackbar = (message) => {
    this.setState({
      snackbarMessage: message,
      isSnackbarOpen: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, fullName, loginOpen, isLoggedIn } = this.state;

    return (
      <ScaffoldContainer>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.isSnackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.closeSnackbar}
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />

        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Grid>


          <Hidden xsDown implementation="css">
            <Grid item>
              {isLoggedIn ?
                <React.Fragment>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography
                        className={classes.name}
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClickUser}
                      >
                        {fullName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Avatar alt={fullName} className={classes.avatar}>
                        <PersonIcon
                          aria-owns={anchorEl ? 'simple-menu' : undefined}
                          aria-haspopup="true"
                          onClick={this.handleClickUser}
                        />
                      </Avatar>
                    </Grid>
                  </Grid>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleCloseUser}
                  >
                    <MenuItem onClick={this.handleCloseUser}>Profile</MenuItem>
                    <MenuItem onClick={this.handleCloseUser}>My account</MenuItem>
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                  </Menu>
                </React.Fragment>
                :
                <React.Fragment>


                  <Button variant="contained" color="secondary" onClick={this.handleClickLogin}>
                    Log In
                </Button>
                  <Dialog
                    open={loginOpen}
                    onClose={this.handleCloseLogin}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">Log In</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Please enter your full name:
                    </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        value={fullName}
                        onChange={this.handleChange('fullName')}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleCancelLogin}>
                        Cancel
                    </Button>
                      <Button onClick={this.handleSubmitLogin} color="primary">
                        Log in
                    </Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>


              }
            </Grid>
          </Hidden>



        </Grid>
      </ScaffoldContainer>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);
