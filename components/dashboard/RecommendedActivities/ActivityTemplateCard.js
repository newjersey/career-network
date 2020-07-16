import React from 'react';
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TimerIcon from '@material-ui/icons/Timer';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import NextLink from 'next/link';
import {
  JOB_SEARCH_CATEGORY_COLORS,
  JOB_SEARCH_CATEGORIES,
  MILESTONE_TYPES,
} from '../../../constants';
import MilestoneIcon from '../../activityTemplate/MilestoneIcon';
import theme from '../../../src/theme';

const useStyles = makeStyles({
  title: {
    margin: theme.spacing(2, 0),
  },
  overviewWrapper: {
    maxHeight: 66, // body4 line height * 3
  },
  overview: {
    ...theme.typography.body4,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
  },
  leftFooter: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  iconLabel: {
    ...theme.typography.h7,
    margin: theme.spacing(0, 1.5, 0, 1),
  },
  link: {
    fontWeight: 700,
    color: theme.palette.text.secondary,
  },
});

function ActivityTemplateCard(props) {
  const classes = useStyles();
  const { slug, category, milestone, title, sections, totalTime } = props;
  const overview = sections
    .find(section => section.slug === 'what-and-why')
    .content.reduce((prev, cur) => prev + cur.content, '');
  const categoryType = JOB_SEARCH_CATEGORIES.find(cat => cat.slug === category);
  const milestoneType = MILESTONE_TYPES.find(ms => ms.slug === milestone);
  const categoryColor = JOB_SEARCH_CATEGORY_COLORS[category];

  return (
    <Box borderColor="grey.300" border={0.5} borderRadius={6} mb={3}>
      <Box p={5}>
        <Typography variant="h6" style={{ color: categoryColor, fontSize: 12, fontWeight: 700 }}>
          {categoryType.name}
        </Typography>
        <Typography variant="h3" className={classes.title}>
          {title}
        </Typography>
        <div className={classes.overviewWrapper}>
          <Typography
            variant="body2"
            className={classes.overview}
            dangerouslySetInnerHTML={{ __html: overview }}
          />
        </div>
      </Box>
      <Box
        display="flex"
        justify="space-between"
        pl={5}
        pr={4}
        py={2}
        borderTop={0.5}
        borderColor={categoryColor}
        bgcolor={fade(JOB_SEARCH_CATEGORY_COLORS[category], 0.07)}
      >
        <div className={classes.leftFooter}>
          <MilestoneIcon type={milestone} color={categoryColor} />
          <Typography variant="h6" className={classes.iconLabel}>
            {milestoneType.name}
          </Typography>
          <TimerIcon style={{ color: categoryColor }} />
          <Typography variant="h6" className={classes.iconLabel}>
            {totalTime}
          </Typography>
        </div>
        <NextLink href={`/activity-template?template=${slug}`}>
          <Button className={classes.link}>Start this activity ▸</Button>
        </NextLink>
      </Box>
    </Box>
  );
}

ActivityTemplateCard.propTypes = {
  slug: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  milestone: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalTime: PropTypes.string.isRequired,
};

export default ActivityTemplateCard;
