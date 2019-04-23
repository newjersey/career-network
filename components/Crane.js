import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';

const styles = theme => ({
  root: {
    width: '100%',
  }
});

class Crane extends React.Component {
  componentDidMount() {
    const svgObj = ReactDOM.findDOMNode(this.InputLabelRef);
    const svgElements = svgObj.contentDocument.querySelectorAll('.animate > *');

    window.addEventListener('scroll', (e) => this.handleScroll(svgElements, e));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (svgElements) => {
    let scrollPercentage =
      (document.documentElement.scrollTop + document.body.scrollTop) /
      (document.documentElement.scrollHeight - document.documentElement.clientHeight);

    // hacky, imperical values
    // TODO: redo with some smart calculations
    let y = scrollPercentage * -1300 + 600;

    svgElements.forEach(el => { el.setAttributeNS(null, 'transform', `translate(0, ${y})`) });
  };

  render() {
    const { classes } = this.props;

    return (
      <object
        type="image/svg+xml"
        data="/static/img/index/crane.svg"
        className={classes.root}
        ref={ref => {
          this.InputLabelRef = ref;
        }}
      />
    );
  }
}

export default withStyles(styles)(Crane);
