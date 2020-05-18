import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  label: {
    fontWeight: 500,
  },
  formHelperText: {
    margin: theme.spacing(0, 0, 2, 4),
    ...theme.typography.helperText,
  },
  card: {
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(1),
  },
  cardSelected: {
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(1),
    backgroundColor: 'rgba(24, 129, 197, 0.07)',
  },
}));

export default function BinaryQuestion(props) {
  const { onChange, value, label, helperText, slug } = props;
  const classes = useStyles();
  const [checked, setChecked] = useState(value);

  const handleChange = val => {
    setChecked(val);
    onChange(val, slug);
  };

  return (
    <Card className={checked ? classes.cardSelected : classes.card} variant="outlined">
      <FormControlLabel
        classes={{
          label: classes.label,
        }}
        label={label}
        control={
          <Checkbox
            color="primary"
            checked={checked}
            value={slug}
            onChange={e => handleChange(e.target.checked)}
          />
        }
      />
      {helperText && (
        <FormHelperText className={classes.formHelperText}>{helperText}</FormHelperText>
      )}
    </Card>
  );
}

BinaryQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};
