import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  body: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('lg')]: {
      marginBottom: theme.spacing(4),
    },
  },
});

function SectionContent(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Typography variant="h5" component="h2">
        {props.title}
      </Typography>
      <Typography variant="body1" className={classes.body}>
        {props.children}
      </Typography>
      {props.buttonText &&
        <Button variant="contained" color={props.buttonColor}>
          {props.buttonText}
        </Button>
      }
    </React.Fragment>
  );
}

SectionContent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  buttonText: PropTypes.string,
  buttonColor: PropTypes.string,
};

SectionContent.defaultProps = {
  buttonColor: 'primary',
};

export default withStyles(styles)(SectionContent);
