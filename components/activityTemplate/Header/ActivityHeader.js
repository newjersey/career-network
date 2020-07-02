import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Divider from '@material-ui/core/Divider';
import ScaffoldContainer from '../../ScaffoldContainer';
import JobSearchShape from '../../JobSearchShape';
import MilestoneTag from './MilestoneTag';
import { JOB_SEARCH_CATEGORY_COLORS } from '../../../constants';
import ActivityTemplatePropTypes from '../PropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    overflow: 'hidden',
  },
  title: {
    margin: theme.spacing(2, 0, 2),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '70%',
    },
  },
  categoryShape: {
    width: 314,
    height: 'auto',
    position: 'absolute',
    top: -100,
    right: -100,
  },
  shapeContainer: {
    position: 'relative',
    zIndex: 2,
    overflow: 'hidden',
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
  backBtn: {
    position: 'absolute',
    top: 0,
    margin: theme.spacing(4, 0, 4),
    zIndex: 1,
  },
  backBtnText: {
    color: theme.palette.grey['700'],
    fontWeight: 'bold',
    borderBottom: `1.5px solid ${theme.palette.grey['700']}`,
    fontSize: theme.spacing(1.5),
  },
}));

export default function ActivityHeader(props) {
  const classes = useStyles();
  const {
    title,
    categoryType,
    categoryLabel,
    milestoneType,
    milestoneLabel,
    isMilestone,
    milestoneGoal,
  } = props;
  const categoryColor = JOB_SEARCH_CATEGORY_COLORS[categoryType];

  return (
    <div
      className={classes.root}
      style={{ backgroundColor: isMilestone && fade(categoryColor, 0.07) }}
    >
      <ScaffoldContainer className={classes.headerContent}>
        {isMilestone && (
          <Button className={classes.backBtn} size="small" startIcon={<ArrowBackIosIcon />}>
            <NextLink href="/job-search-basics">
              <Typography className={classes.backBtnText} variant="button">
                Job Search Basics
              </Typography>
            </NextLink>
          </Button>
        )}
        <Divider variant="fullWidth" className={classes.divider} />
        <Typography variant="h6" style={{ color: categoryColor, fontWeight: 600 }}>
          {categoryLabel}
        </Typography>
        <Typography variant="h1" className={classes.title}>
          {title}
        </Typography>
        {isMilestone ? (
          <Typography variant="body2" style={{ width: '50%' }}>
            {milestoneGoal}
          </Typography>
        ) : (
          <MilestoneTag color={categoryColor} type={milestoneType} label={milestoneLabel} />
        )}
      </ScaffoldContainer>
      <JobSearchShape jobSearchCategory={categoryType} className={classes.categoryShape} />
    </div>
  );
}

ActivityHeader.propTypes = {
  title: PropTypes.string.isRequired,
  categoryType: ActivityTemplatePropTypes.jobCategorySlug.isRequired,
  categoryLabel: PropTypes.string.isRequired,
  milestoneType: ActivityTemplatePropTypes.milestoneSlug.isRequired,
  milestoneLabel: PropTypes.string.isRequired,
  isMilestone: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  milestoneGoal: PropTypes.string,
};

ActivityHeader.defaultProps = {};
