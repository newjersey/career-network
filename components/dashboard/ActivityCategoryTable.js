import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Gauge from '../Gauge';

export default function ActivityCategoryTable(props) {
  const { confidenceByCategories, confidentActivitiesCount, totalActivitiesCount } = props;

  return (
    <Box mt={2}>
      <Paper>
        <Box pt={4} pb={4}>
          <Gauge
            percentage={confidentActivitiesCount / totalActivitiesCount}
            label="Feeling Confident"
          />
        </Box>
        <Divider />
        <Table>
          <TableBody>
            {confidenceByCategories.map(conf => (
              <TableRow key={conf.category}>
                <TableCell component="th" scope="row">
                  <Typography variant="body2">{conf.category}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" noWrap style={{ fontWeight: 'bold' }}>
                    {conf.confident} of {conf.total}
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
                  {confidentActivitiesCount} of {totalActivitiesCount}
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
