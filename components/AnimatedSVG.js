import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  root: {
    width: '100%',
  },
});

function AnimatedSVG(props) {
  const { classes, path } = props;
  const domNode = useRef();

  const handleScroll = () => {
    const scrollPercentage = (
      (document.documentElement.scrollTop + document.body.scrollTop) /
      (document.documentElement.scrollHeight - document.documentElement.clientHeight));

    // Page scroll percentage is a hacky metric to use here.
    // TODO: calculate and expose some smarter calculations.
    const transform = props.transform(scrollPercentage);
    const svgElements = domNode.current.contentDocument.querySelectorAll('.animate');

    svgElements.forEach((el) => {
      el.setAttributeNS(null, 'transform', transform);
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
  classes: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  transform: PropTypes.func.isRequired,
};

export default withStyles(styles)(AnimatedSVG);
