import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';

const useStyles = makeStyles(theme => ({
  body: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('lg')]: {
      marginBottom: theme.spacing(4),
    },
  },
}));

function SectionContent(props) {
  const classes = useStyles();
  const { showSignIn } = useAuth();
  const {
    buttonColor,
    buttonText,
    children,
    onButtonClick,
    title,
  } = props;

  const handleClickButton = onButtonClick || (() => showSignIn());

  return (
    <React.Fragment>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      <Typography variant="body1" className={classes.body}>
        {children}
      </Typography>
      {buttonText && (
        <Button variant="contained" color={buttonColor} onClick={handleClickButton}>
          {buttonText}
        </Button>
      )}
    </React.Fragment>
  );
}

SectionContent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  buttonText: PropTypes.string,
  buttonColor: PropTypes.string,
  onButtonClick: PropTypes.func,
};

SectionContent.defaultProps = {
  buttonColor: 'primary',
  buttonText: undefined,
  onButtonClick: null,
};

export default SectionContent;
