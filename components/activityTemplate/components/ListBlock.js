/* eslint-disable react/no-danger */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const getItemKey = index => `item-${index}`;

const ListBlock = ({ heading, subheading, items }) => (
  <div>
    {heading && (
      <Typography gutterBottom display="block" variant="body1" style={{ fontWeight: 700 }}>
        {heading}
      </Typography>
    )}
    {subheading && (
      <Typography paragraph display="block" variant="body2">
        {subheading}
      </Typography>
    )}
    <ul>
      {items.map((item, index) => (
        <Typography component="li" variant="body2" key={getItemKey(index)} gutterBottom>
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </Typography>
      ))}
    </ul>
  </div>
);

ListBlock.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
};

ListBlock.defaultProps = {
  heading: '',
  subheading: '',
  items: [],
};

export default ListBlock;
