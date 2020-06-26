/* eslint-disable react/no-danger */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
    whiteSpace: 'pre-wrap',
    display: 'block',
  },
}));

function TextBlock({ content }) {
  const classes = useStyles();
  return (
    <>
      {React.Children.toArray(
        content
          .split('\n')
          .map(text => (
            <Typography
              className={classes.root}
              variant="body1"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))
      )}
    </>
  );
}

TextBlock.propTypes = {
  content: PropTypes.string.isRequired,
};

TextBlock.displayName = 'TextBlock';

export default TextBlock;
