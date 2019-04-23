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

    // hacky, imperical values
    // TODO: redo with some smart calculations
    let y = scrollPercentage * -1000 + 500;

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
