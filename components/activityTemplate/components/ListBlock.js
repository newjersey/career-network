/* eslint-disable react/no-danger */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: props => props.backgroundColor || theme.palette.background.paper,
  },
  heading: {
    fontWeight: 700,
    fontSize: '1.125rem',
  },
  body4: {
    fontSize: '1.125rem',
    lineHeight: 1.57,
  },
}));

const getItemKey = index => `item-${index}`;

function ListBlock({ heading, subheading, items }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {heading && (
        <Typography gutterBottom display="block" variant="body1" className={classes.heading}>
          {heading}
        </Typography>
      )}
      {subheading && (
        <Typography
          paragraph
          display="block"
          variant="body2"
          className={classes.body4}
          dangerouslySetInnerHTML={{ __html: subheading }}
        />
      )}
      <ul>
        {items.map((item, index) => (
          <Typography
            component="li"
            variant="body2"
            key={getItemKey(index)}
            gutterBottom
            className={classes.body4}
          >
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </Typography>
        ))}
      </ul>
    </div>
  );
}
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
