import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  formControl: {
    minWidth: '15em',
  },
});

const UNEMPLOYMENT_TERMS = [
  { value: 'short', label: 'I am recently unemployed' },
  { value: 'long', label: 'I have been unemployed for a while' },
  { value: 'indefinite', label: 'I have never had a job' },
];

class CircumstancePicker extends React.Component {
  state = {
    unemploymentTerm: '',
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            htmlFor="circumstance-picker-outlined"
            ref={ref => {
              this.InputLabelRef = ref;
            }}>
            What brings you here?
          </InputLabel>
          <Select
            value={this.state.unemploymentTerm}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="unemploymentTerm"
                id="circumstance-picker-outlined"
              />
            }
          >
            {UNEMPLOYMENT_TERMS.map(term => (
              <MenuItem value={term.value} key={term.value}>{term.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

CircumstancePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircumstancePicker);
