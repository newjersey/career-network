import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';

import ActivityHeader from '../activityTemplate/Header/ActivityHeader';
import { JOB_SEARCH_CATEGORIES, JOB_SEARCH_CATEGORY_COLORS } from '../../constants';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  backBtn: {
    position: 'absolute',
    margin: theme.spacing(4, 0, 4),
    zIndex: 1,
  },
  backBtnText: {
    color: theme.palette.grey['700'],
    fontWeight: 'bold',
    borderBottom: `1.5px solid ${theme.palette.grey['700']}`,
    fontSize: theme.spacing(1.5),
  },
  milestoneHeader: {
    position: 'absolute',
  },
  milestoneContent: {
    width: '50%',
  },
}));

const MilestoneHeader = props => {
  const classes = useStyles();
  const { category, title, goal } = props;

  const categoryType = JOB_SEARCH_CATEGORIES.find(cat => cat.slug === category);

  return (
    <div style={{ backgroundColor: fade(JOB_SEARCH_CATEGORY_COLORS[category], 0.07) }}>
      <ScaffoldContainer>
        <Button className={classes.backBtn} size="small" startIcon={<ArrowBackIosIcon />}>
          <NextLink href="/job-search-basics">
            <Typography className={classes.backBtnText} variant="button">
              Job Search Basics
            </Typography>
          </NextLink>
        </Button>
      </ScaffoldContainer>
      <ActivityHeader
        className={classes.milestoneHeader}
        categoryType={categoryType.slug}
        categoryLabel={categoryType.name}
        title={title}
      />
      <ScaffoldContainer>
        <Box mt={-10} pb={9} className={classes.milestoneContent}>
          <Typography variant="body1"> {goal} </Typography>
        </Box>
      </ScaffoldContainer>
    </div>
  );
};

MilestoneHeader.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired,
};

export default MilestoneHeader;
