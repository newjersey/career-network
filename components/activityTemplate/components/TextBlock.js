import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const TextBlock = ({ content, ...restProps }) => (
  <Box mb={4}>
    <Typography variant="body1" {...restProps}>
      {content}
    </Typography>
  </Box>
);

TextBlock.propTypes = {
  content: PropTypes.string.isRequired,
};

TextBlock.displayName = 'TextBlock';

export default TextBlock;
