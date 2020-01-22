import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import React from 'react';

function ScaffoldContainer(props) {
  const { children, className } = props;

  return (
    <Container maxWidth="lg" className={className}>
      {children}
    </Container>
  );
}

ScaffoldContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  className: PropTypes.string,
};

ScaffoldContainer.defaultProps = {
  className: undefined,
};

export default ScaffoldContainer;
