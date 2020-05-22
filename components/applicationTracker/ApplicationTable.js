import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import formatDate from 'date-fns/format';
import StatusChip from './ApplicationStatusChip';

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontWeight: 500,
  },
  footer: {
    padding: theme.spacing(2, 3),
  },
  root: {
    paddingLeft: 0,
  },
  head: {
    paddingBottom: 0,
    color: theme.palette.grey['600'],
    fontWeight: 400,
  },
  detailsCol: {
    width: '50%',
    paddingLeft: 0,
  },
  firstCol: {
    paddingLeft: 0,
  },
  headerRow: {
    borderWidth: 2,
  },
}));

const getStatusEntryField = (statusEntries, entryId, fieldName) => {
  const entry = statusEntries.find(item => item.id === entryId);
  return entry ? entry[fieldName] : null;
};
function ApplicationTable({ applications, handleUpdate, openApplicationHistory }) {
  const classes = useStyles();

  const rows = applications
    .map(({ document, id }) => ({
      jobTitle: document.jobTitle,
      company: document.company,
      lastUpdate: getStatusEntryField(
        document.statusEntries,
        document.currentStatusEntryId,
        'timestamp'
      ),
      status: getStatusEntryField(document.statusEntries, document.currentStatusEntryId, 'status'),
      document,
      id,
    }))
    .slice()
    .sort((appA, appB) => appB.lastUpdate.toDate() - appA.lastUpdate.toDate());

  const formatLastUpdate = timestamp => formatDate(timestamp.toDate(), 'MMM do');

  const handleClick = (event, applicationId, document) =>
    openApplicationHistory(applicationId, document);

  const handleUpdateApplication = (event, id, document) => {
    event.stopPropagation();
    handleUpdate(id, document);
  };

  return (
    <div className={classes.root}>
      <Table aria-label="application-table">
        <TableHead>
          <TableRow className={classes.headerRow}>
            <TableCell classes={{ head: classes.head }} className={classes.detailsCol}>
              Details
            </TableCell>
            <TableCell classes={{ head: classes.head }} align="left">
              Last Update
            </TableCell>
            <TableCell classes={{ head: classes.head }} align="left">
              Status
            </TableCell>
            <TableCell classes={{ head: classes.head }} align="left" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ jobTitle, company, lastUpdate, status, id, document }) => (
            <TableRow key={id} hover onClick={event => handleClick(event, id, document)}>
              <TableCell component="th" scope="row" className={classes.firstCol}>
                <Typography variant="body1">{jobTitle}</Typography>
                {company && <Typography variant="body2">at {company}</Typography>}
              </TableCell>
              <TableCell align="left">{lastUpdate && formatLastUpdate(lastUpdate)}</TableCell>
              <TableCell align="left">
                <StatusChip status={status} />
              </TableCell>
              <TableCell align="right">
                <Button
                  className={classes.button}
                  onClick={event => handleUpdateApplication(event, id, document)}
                  variant="contained"
                  size="large"
                >
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

ApplicationTable.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  openApplicationHistory: PropTypes.func.isRequired,
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      document: PropTypes.object,
    })
  ),
};

ApplicationTable.defaultProps = {
  applications: [],
};

export default ApplicationTable;
