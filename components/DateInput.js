import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';

function DateInput(props) {
  const theme = useTheme();

  const datePickerTheme = createMuiTheme({
    overrides: {
      MuiFormControl: {
        marginNormal: {
          marginTop: theme.spacing(1),
          marginRight: theme.spacing(0),
          marginBottom: theme.spacing(1),
          marginLeft: theme.spacing(0),
        },
      },
    },
  });
  const { value, onChange, placeholder, inputProps, ...restProps } = props;

  return (
    <MuiThemeProvider theme={datePickerTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          fullWidth
          variant="inline"
          inputVariant="outlined"
          format="MM/dd/yyyy"
          margin="normal"
          value={value}
          onChange={onChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          inputProps={{ ...inputProps, placeholder }}
          {...restProps}
        />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

DateInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  inputProps: PropTypes.objectOf(PropTypes.any),
};

DateInput.defaultProps = {
  value: null,
  placeholder: null,
  inputProps: {},
};

export default DateInput;
