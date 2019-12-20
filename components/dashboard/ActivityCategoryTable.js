import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import FirebasePropTypes from '../Firebase/PropTypes';
import Gauge from '../Gauge';

function getCountsByCategory(activityLogEntries) {
  return activityLogEntries
    .map(entry => entry.data().category)
    .reduce(
      (counts, current) => ({
        ...counts,
        [current]: (counts[current] || 0) + 1,
      }),
      {}
    );
}

export default function ActivityCategoryTable(props) {
  const { allActivityLogEntries, subsetActivityLogEntries, label } = props;
  const subsetCounts = getCountsByCategory(subsetActivityLogEntries);
  const totalCounts = getCountsByCategory(allActivityLogEntries);
  const subsetActivitiesCount = subsetActivityLogEntries.length;
  const totalActivitiesCount = allActivityLogEntries.length;
  const subsetByCategories = Object.keys(totalCounts).map(key => {
    return { category: key, subset: subsetCounts[key] || 0, total: totalCounts[key] };
  });

  return (
    <Box mt={2}>
      <Paper>
        <Box py={4}>
          <Gauge
            label={label}
            percentage={
              totalActivitiesCount === 0 ? 0 : subsetActivitiesCount / totalActivitiesCount
            }
          />
        </Box>
        <Divider />
        <Table>
          <TableBody>
            {subsetByCategories.map(sub => (
              <TableRow key={sub.category}>
                <TableCell component="th" scope="row">
                  <Typography variant="body2">{sub.category}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" noWrap style={{ fontWeight: 'bold' }}>
                    {sub.subset} of {sub.total}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow selected>
              <TableCell component="th" scope="row">
                <Typography variant="body2">Total Reported Activities</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" noWrap style={{ fontWeight: 'bold' }}>
                  {subsetActivitiesCount} of {totalActivitiesCount}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
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
