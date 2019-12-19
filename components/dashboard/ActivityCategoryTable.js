import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

export default function ActivityCategoryTable(props) {
  const { confidenceByCategories, confidentActivitiesCount, totalActivitiesCount } = props;

  return (
    <Box mt={4}>
      <Paper>
        <Table>
          <TableBody>
            {confidenceByCategories.map(conf => (
              <TableRow key={conf.category}>
                <TableCell component="th" scope="row">
                  {conf.category}
                </TableCell>
                <TableCell align="right">
                  {conf.confident}/{conf.total}
                </TableCell>
              </TableRow>
            ))}
            <TableRow selected>
              <TableCell>Total Reported Activities</TableCell>
              <TableCell>
                {confidentActivitiesCount}/{totalActivitiesCount}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

ActivityCategoryTable.propTypes = {
  confidenceByCategories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      confident: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
  confidentActivitiesCount: PropTypes.number.isRequired,
  totalActivitiesCount: PropTypes.number.isRequired,
};
