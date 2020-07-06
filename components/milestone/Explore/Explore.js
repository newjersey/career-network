import React from 'react';
import Button from '@material-ui/core/Button';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { MILESTONE_TYPES } from '../../../constants';
import MilestoneIcon from '../../activityTemplate/MilestoneIcon';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: theme.palette.navy['500'],
    borderStyle: 'solid',
    borderRadius: 3,
    padding: theme.spacing(4),
    backgroundColor: 'white',
    position: 'relative',
    color: theme.palette.grey['900'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    position: 'absolute',
    border: props => `1px solid ${props.categoryColor}`,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    left: -20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  link: {
    fontWeight: 700,
    color: theme.palette.text.secondary,
  },
}));

function Explore({ categoryColor, milestoneSlug }) {
  const classes = useStyles({ categoryColor });
  const milestoneType = MILESTONE_TYPES.find(ms => ms.slug === milestoneSlug);

  return (
    <div className={classes.root}>
      <div className={classes.circle}>
        <MilestoneIcon type={milestoneSlug} color={categoryColor} />
      </div>

      <Typography variant="h6" className={classes.iconLabel}>
        {milestoneType.name}
      </Typography>
      {milestoneSlug && (
        <NextLink href={`/milestones/${milestoneSlug}`}>
          <Button className={classes.link}>
            <u>Explore</u>
          </Button>
        </NextLink>
      )}
    </div>
  );
}

Explore.propTypes = {
  categoryColor: PropTypes.string.isRequired,
  milestoneSlug: PropTypes.string.isRequired,
};

export default Explore;
