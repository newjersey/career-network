import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

const styles = theme => ({
  root: {
    width: '100%',
  }
});

class AnimatedSVG extends React.Component {
  componentDidMount() {
    const svgObj = ReactDOM.findDOMNode(this.InputLabelRef);
    window.addEventListener('scroll', (e) => this.handleScroll(svgObj, e));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (svgObj) => {
    const svgElements = svgObj.contentDocument.querySelectorAll('.animate > *');
    const scrollPercentage =
      (document.documentElement.scrollTop + document.body.scrollTop) /
      (document.documentElement.scrollHeight - document.documentElement.clientHeight);

    // Page scroll percentage is a hacky metric to use here.
    // TODO: calculate and expose some smarter calculations.
    let transform = this.props.transform(scrollPercentage);

    svgElements.forEach(el => { el.setAttributeNS(null, 'transform', transform) });
  };

  render() {
    const { classes, path } = this.props;

    return (
      <object
        type="image/svg+xml"
        data={path}
        className={classes.root}
        ref={ref => {
          this.InputLabelRef = ref;
        }}
      />
    );
  }
}

AnimatedSVG.propTypes = {
  path: PropTypes.string.isRequired,
  transform: PropTypes.func.isRequired,
};

export default withStyles(styles)(AnimatedSVG);
