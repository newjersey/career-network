import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ActionItem from './ActionItem';
import CompletionActionItem from './CompletionActionItem';

const useStyles = makeStyles(theme => ({
  sectionTitle: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    color: theme.palette.background.dark,
    fontSize: '1rem',
  },
  listItem: {
    marginBottom: theme.spacing(3),
  },
}));

function WeekSegment(props) {
  const classes = useStyles();
  const { cards, weekIndex, isVisible, selectedFilter } = props;
  const visibleCards = useMemo(
    () =>
      cards.filter(
        item =>
          !selectedFilter ||
          (selectedFilter &&
            item.props.actionType &&
            item.props.actionType.value === selectedFilter)
      ),
    [cards, selectedFilter]
  );

  if (!isVisible || visibleCards.length === 0) {
    return null;
  }

  return (
    <>
      <Typography className={classes.sectionTitle} variant="h5">
        {`Week ${weekIndex}`}
      </Typography>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        {visibleCards.map(card => (
          <Grid key={card.props.id} item xs={12} className={classes.listItem}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {card.isCompletionEvent ? (
              <CompletionActionItem {...card.props} />
            ) : (
              <ActionItem {...card.props} />
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

WeekSegment.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      isCompletionEvent: PropTypes.bool,
      timestamp: PropTypes.instanceOf(Date),
      props: PropTypes.object,
    })
  ),
  weekIndex: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  selectedFilter: PropTypes.string,
};

WeekSegment.defaultProps = {
  cards: [],
  selectedFilter: null,
};

export default WeekSegment;
