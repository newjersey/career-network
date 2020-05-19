import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontWeight: 500,
  },
  dash: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(3, 2, 0),
    fontWeight: 500,
    fontSize: 16,
  },
}));

function EducationItemForm({ handleChange, handleSubmit, values }) {
  const formId = 'educationItems';
  const classes = useStyles();

  const onSubmit = () => {
    handleSubmit(values);
  };

  return (
    <>
      <form id={formId} onSubmit={onSubmit}>
        <span>School</span>
        <TextField
          className={classes.textField}
          fullWidth
          id={`${formId}-school`}
          inputProps={{
            name: 'school',
          }}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          placeholder="Enter the School Name"
          value={values.school}
          variant="outlined"
        />
        <span>Major / Field of Study</span>
        <TextField
          className={classes.textField}
          fullWidth
          id={`${formId}-study-field`}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            name: 'study-field',
          }}
          onChange={handleChange}
          placeholder="Enter the Major / Field of Study"
          value={values['study-field']}
          variant="outlined"
        />
        <span>Years Attended</span>
        <Grid container wrap="nowrap">
          <Grid item md={6}>
            <TextField
              fullWidth
              variant="outlined"
              className={classes.textField}
              id={`${formId}-education-start-year`}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                name: 'education-start-year',
              }}
              type="number"
              onChange={handleChange}
              placeholder="Enter Start Year"
              value={values['education-start-year']}
            />
          </Grid>
          <div className={classes.dash}>–</div>
          <Grid item md={6}>
            <TextField
              className={classes.textField}
              fullWidth
              id={`${formId}-education-end-year`}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                name: 'education-end-year',
              }}
              onChange={handleChange}
              placeholder="Enter End Year"
              type="number"
              value={values['education-end-year']}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
}

EducationItemForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    school: PropTypes.string,
    'study-field': PropTypes.string,
    'education-start-year': PropTypes.string,
    'education-end-year': PropTypes.string,
  }),
};

EducationItemForm.defaultProps = {
  values: {
    'study-field': '',
    school: '',
    'education-start-year': '',
    'education-end-year': '',
  },
};

export default EducationItemForm;
