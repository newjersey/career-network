import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import InputBase from '@material-ui/core/InputBase';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    //    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      //      marginLeft: theme.spacing(1),
      //      width: 'auto',
    },
  },
  icon: {
    width: theme.spacing(9),
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
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

function Search() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        <SearchIcon />
      </div>
      <InputBase
        inputProps={{ 'aria-label': 'Search' }}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
  );
}

export default Search;
