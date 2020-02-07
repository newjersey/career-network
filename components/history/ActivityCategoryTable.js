import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { ACTIVITY_TYPES } from '../activityInput/ActivityInputDialog';
import FirebasePropTypes from '../Firebase/PropTypes';
import Gauge from '../Gauge';

function getCountsByCategory(activityLogEntries) {
  const getActivityCategoryName = activityTypeValue =>
    ACTIVITY_TYPES.find(activityType => activityType.value === activityTypeValue).category.name;

  return activityLogEntries
    .map(entry => getActivityCategoryName(entry.data().activityTypeValue))
    .reduce(
      (counts, current) => ({
        ...counts,
        [current]: (counts[current] || 0) + 1,
      }),
      {}
    );
}

const useStyles = makeStyles(theme => ({
  totalTableRow: {
    backgroundColor: theme.palette.background.info,
    borderBottom: 'none',
  },
}));

export default function ActivityCategoryTable(props) {
  const classes = useStyles();
  const { allActivityLogEntries, subsetActivityLogEntries, label } = props;
  const subsetCounts = getCountsByCategory(subsetActivityLogEntries);
  const totalCounts = getCountsByCategory(allActivityLogEntries);
  const subsetActivitiesCount = subsetActivityLogEntries.length;
  const totalActivitiesCount = allActivityLogEntries.length;
  const subsetByCategories = Object.keys(totalCounts).map(key => {
    return { category: key, subset: subsetCounts[key] || 0, total: totalCounts[key] };
  });
  const isEmpty = totalActivitiesCount === 0;

  return (
    <>
      <Box mb={4} mx={4}>
        <Gauge
          label={label}
          percentage={isEmpty ? 0 : subsetActivitiesCount / totalActivitiesCount}
          disabled={isEmpty}
        />
        {isEmpty && (
          <Box mt={1}>
            <Typography variant="h6" align="center" style={{ fontSize: '1.5em' }} gutterBottom>
              No Activities Logged
            </Typography>
            <Typography variant="body2" align="center">
              You have not logged any activities yet. Start logging your activities and we’ll help
              you track your confidence level over time.
            </Typography>
          </Box>
        )}
      </Box>
      <Divider />
      <Table>
        <TableBody>
          {subsetByCategories.map(sub => (
            <TableRow key={sub.category}>
              <TableCell component="th" scope="row">
                <Typography variant="body2" color="textSecondary">
                  {sub.category}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" noWrap style={{ fontWeight: 'bold' }}>
                  {sub.subset} of {sub.total}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
          <TableRow className={classes.totalTableRow}>
            <TableCell component="th" scope="row" className={classes.totalTableRow}>
              <Typography variant="body2" color="textSecondary">
                Total Reported Activities
              </Typography>
            </TableCell>
            <TableCell align="right" className={classes.totalTableRow}>
              <Typography variant="body2" noWrap style={{ fontWeight: 'bold' }}>
                {subsetActivitiesCount} of {totalActivitiesCount}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

ActivityCategoryTable.propTypes = {
  allActivityLogEntries: FirebasePropTypes.querySnapshot,
  subsetActivityLogEntries: FirebasePropTypes.querySnapshot,
  label: PropTypes.string.isRequired,
};

ActivityCategoryTable.defaultProps = {
  allActivityLogEntries: [],
  subsetActivityLogEntries: [],
};
