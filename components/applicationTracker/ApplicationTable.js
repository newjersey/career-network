import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import formatDate from 'date-fns/format';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontWeight: 500,
  },
  footer: {
    padding: theme.spacing(2, 3),
  },
}));

const getStatusEntryField = (statusEntries, entryId, fieldName) => {
  const entry = statusEntries.find(item => item.id === entryId);
  return entry ? entry[fieldName] : null;
};

function ApplicationTable({ applications }) {
  const classes = useStyles();

  console.log(applications);

  const rows = applications.map(({ document, id }) => ({
    jobTitle: document.jobTitle,
    company: document.company,
    lastUpdate: getStatusEntryField(
      document.statusEntries,
      document.currentStatusEntryId,
      'timestamp'
    ),
    status: getStatusEntryField(document.statusEntries, document.currentStatusEntryId, 'status'),
    id,
  }));
  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="application-table">
            <TableHead>
              <TableRow>
                <TableCell>Details</TableCell>
                <TableCell align="right">Last Update</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(({ jobTitle, company, lastUpdate, status, id }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {jobTitle} at {company}
                  </TableCell>
                  <TableCell align="right">
                    {/* {lastUpdate && (formatDate(new Date(lastUpdate)), 'MMM eo')} */}
                  </TableCell>
                  <TableCell align="right">{status}</TableCell>
                  <TableCell align="right">Edit</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScaffoldContainer>
    </div>
  );
}

ApplicationTable.propTypes = {};

ApplicationTable.defaultProps = {
  applications: [],
};

export default ApplicationTable;
