import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

function AnimatedSVG(props) {
  const { path, transform } = props;
  const classes = useStyles();
  const domNode = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (
        // eslint-disable-next-line operator-linebreak
        (document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight - document.documentElement.clientHeight));

      // Page scroll percentage is a hacky metric to use here.
      // TODO: calculate and expose some smarter calculations.
      const transformValue = transform(scrollPercentage);
      const svgElements = domNode.current.contentDocument.querySelectorAll('.animate');

      svgElements.forEach((el) => {
        el.setAttributeNS(null, 'transform', transformValue);
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [transform]);

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <object
      type="image/svg+xml"
      aria-hidden="true"
      data={path}
      className={classes.root}
      ref={domNode}
    />
  );
}

AnimatedSVG.propTypes = {
  path: PropTypes.string.isRequired,
  transform: PropTypes.func.isRequired,
};

export default AnimatedSVG;
