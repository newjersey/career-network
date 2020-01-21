import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import React from 'react';

function ScaffoldContainer(props) {
  const { children, marginTopValue } = props;

  const style = {
    marginTop: marginTopValue,
  };

  return (
    <Container maxWidth="lg" style={style}>
      {children}
    </Container>
  );
}

ScaffoldContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  marginTopValue: PropTypes.number,
};

ScaffoldContainer.defaultProps = {
  marginTopValue: 0,
};

export default ScaffoldContainer;
