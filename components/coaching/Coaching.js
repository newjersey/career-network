import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import dayjs from 'dayjs';

import ScaffoldContainer from '../ScaffoldContainer';
import CoachingPropTypes from './PropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),
  },
  subtitle: {
    marginTop: theme.spacing(10),
  },
  assignments: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Coaching(props) {
  const classes = useStyles();
  const [currentAssignment, setCurrentAssignment] = useState({
    authProfile: {},
    questionResponses: [],
  });
  const { assignments, assessmentSections } = props;

  const handleClick = (event) => {
    setCurrentAssignment(
      assignments.find(
        assignment => assignment.authProfile.email === event.currentTarget.dataset.email,
      ),
    );
  };

  const findByAssessment = assessmentIds => currentAssignment.questionResponses
    .filter((response) => {
      const questionEntry = response.data().question.fields['Question Assessment Entry'];
      const groupEntry = response.data().question.fields['Group Assessment Entry'];
      const entry = questionEntry ? questionEntry[0] : groupEntry[0];

      return assessmentIds.includes(entry);
    })
    .map(response => response.data());


  const responseValue = (response) => {
    switch (response.question.fields['Response Type']) {
      case 'Option': {
        const responseOption = response.responseOptions.find(
          option => option.id === response.value,
        );
        return responseOption.fields.Name;
      }
      case 'Binary':
        return response.value ? 'Yes' : 'No';
      case 'Date':
        return dayjs(response.value).format('MM/DD/YYYY');
      default:
        return response.value;
    }
  };

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container direction="row" justify="space-between" alignItems="flex-start">
          <Grid item>
            <List className={classes.assignments}>
              {assignments.map(assignment => (
                <ListItem
                  button
                  onClick={handleClick}
                  key={assignment.authProfile.email}
                  data-email={assignment.authProfile.email}
                  selected={currentAssignment.authProfile.email === assignment.authProfile.email}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={assignment.authProfile.photoURL}
                      alt={assignment.authProfile.displayName}
                    >
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={assignment.authProfile.displayName}
                    secondary={assignment.authProfile.email}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={9}>
            {!currentAssignment.authProfile.email && (
              <Typography variant="subtitle2" align="center" className={classes.subtitle}>
                Click one of your assigned job seekers on the left to display the responses
              </Typography>
            )}
            {currentAssignment.authProfile.email && assessmentSections.map(section => (
              <ExpansionPanel key={section.id} defaultExpanded>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id={section.id}
                >
                  <Typography>{section.fields.Name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Table size="small">
                    <TableBody>
                      {findByAssessment(section.fields['Assessment Entries'])
                        .map(response => (
                          <TableRow key={response.question.id}>
                            <TableCell component="th" scope="row">
                              <strong>{response.question.fields.Label}</strong>
                            </TableCell>
                            <TableCell>
                              <span>{responseValue(response)}</span>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

Coaching.propTypes = CoachingPropTypes;
