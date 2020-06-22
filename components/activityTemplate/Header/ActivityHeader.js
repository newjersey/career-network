import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ScaffoldContainer from '../../ScaffoldContainer';
import JobSearchShape from '../../JobSearchShape';
import MilestoneTag from './MilestoneTag';
import {
  JOB_SEARCH_CATEGORY_COLORS,
  FINDING_JOB,
  APPLYING_FOR_JOBS,
  TAKING_CARE,
  RESUME,
  PERSONAL_VALUES,
  INTERVIEWING_SKILLS,
} from '../../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    display: 'flex',
  },
  title: {
    margin: theme.spacing(2, 0, 2),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '70%',
    },
  },
  categoryShape: {
    width: 224,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  shapeContainer: {
    position: 'relative',
    marginLeft: theme.spacing(12),
  },
  headerContent: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(12),
    },
  },
  divider: {
    marginBottom: theme.spacing(11),
  },
}));

export default function ActivityHeader(props) {
  const classes = useStyles();
  const { title, categoryType, categoryLabel, milestoneType, milestoneLabel } = props;
  const categoryColor = JOB_SEARCH_CATEGORY_COLORS[categoryType];

  return (
    <div className={classes.root}>
      <ScaffoldContainer className={classes.headerContent}>
        <Divider variant="fullWidth" className={classes.divider} />
        <Typography variant="body2" style={{ color: categoryColor, fontWeight: 600 }}>
          {categoryLabel}
        </Typography>
        <Typography variant="h1" className={classes.title}>
          {title}
        </Typography>
        <MilestoneTag color={categoryColor} type={milestoneType} label={milestoneLabel} />
      </ScaffoldContainer>

      <JobSearchShape jobSearchCategory={categoryType} className={classes.categoryShape} />
    </div>
  );
}

ActivityHeader.propTypes = {
  title: PropTypes.string.isRequired,
  categoryType: PropTypes.oneOf([FINDING_JOB, APPLYING_FOR_JOBS, TAKING_CARE]).isRequired,
  categoryLabel: PropTypes.string.isRequired,
  milestoneType: PropTypes.oneOf([RESUME, PERSONAL_VALUES, INTERVIEWING_SKILLS]).isRequired,
  milestoneLabel: PropTypes.string.isRequired,
};

ActivityHeader.defaultProps = {};
