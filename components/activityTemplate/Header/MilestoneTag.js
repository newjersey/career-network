import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import ActivityTemplatePropTypes from '../PropTypes';
import MilestoneIcon from '../MilestoneIcon';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 100,
    backgroundColor: theme.palette.background.paper,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: props => props.color,
    height: 52,
    padding: theme.spacing(2),
  },
  label: {
    color: theme.palette.background.dark,
    paddingRight: 0,
  },
  icon: {
    marginLeft: 0,
    marginRight: 0,
  },
}));

const MilestoneTag = ({ label, type, color, className }) => {
  const classes = useStyles({ color });

  return (
    <Chip
      classes={{ root: clsx(classes.root, className), icon: classes.icon, label: classes.label }}
      icon={<MilestoneIcon color={color} type={type} />}
      label={<Typography variant="h6">{label}</Typography>}
    />
  );
};

MilestoneTag.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: ActivityTemplatePropTypes.milestoneSlug.isRequired,
};

MilestoneTag.defaultProps = {
  className: '',
};

export default MilestoneTag;
