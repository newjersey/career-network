import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    width: '100%',
  }
});

class AnimatedSVG extends React.Component {
  constructor(props) {
    super(props);
    this.domNode = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const scrollPercentage =
      (document.documentElement.scrollTop + document.body.scrollTop) /
      (document.documentElement.scrollHeight - document.documentElement.clientHeight);

    // Page scroll percentage is a hacky metric to use here.
    // TODO: calculate and expose some smarter calculations.
    let transform = this.props.transform(scrollPercentage);

    const svgElements = this.domNode.current.contentDocument.querySelectorAll('.animate')

    svgElements.forEach(el => {
      el.setAttributeNS(null, 'transform', transform);
    });
  };

  render() {
    const { classes, path } = this.props;

    return (
      <object
        type="image/svg+xml"
        aria-hidden="true"
        data={path}
        className={classes.root}
        ref={this.domNode}
      />
    );
  }
}

AnimatedSVG.propTypes = {
  path: PropTypes.string.isRequired,
  transform: PropTypes.func.isRequired,
};

export default withStyles(styles)(AnimatedSVG);
