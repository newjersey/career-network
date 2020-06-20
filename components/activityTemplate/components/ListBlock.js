import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const ListBlock = ({ content, ...restProps }) => (
  <Box mb={4}>
    <Typography variant="body1" {...restProps}>
      {content}
    </Typography>
  </Box>
);

ListBlock.propTypes = {
  content: PropTypes.string.isRequired,
};

export default ListBlock;
