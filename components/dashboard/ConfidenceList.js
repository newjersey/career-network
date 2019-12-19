import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function ConfidenceList(props) {
  const { confidenceByCategories } = props;
  return (
    <Box mt={4}>
      {confidenceByCategories.map(conf => (
        <Box key={conf.category} mt={2} display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="body2">{conf.category}</Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              {conf.confident}/{conf.total}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

ConfidenceList.propTypes = {
  confidenceByCategories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      confident: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
};
