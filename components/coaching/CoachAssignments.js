import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import React, {
  useCallback, useEffect, useReducer, useState,
} from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import without from 'lodash/fp/without';
import concat from 'lodash/fp/concat';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import TableHead from '@material-ui/core/TableHead';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import firebase from 'firebase/app';

import ScaffoldContainer from '../ScaffoldContainer';
import useUser from '../Firebase/useUser';
import User from '../../src/User';

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
  jobSeekersSwitch: {
    float: 'right',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

const assignmentsReducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return { [action.coachUid]: action.assignmentIds, ...state };
    case 'add':
      return { ...state, [action.coachUid]: concat(action.uid)(state[action.coachUid]) };
    case 'remove':
      return { ...state, [action.coachUid]: without([action.uid])(state[action.coachUid]) };
    default:
      return state;
  }
};

export default function CoachAssignments(props) {
  const classes = useStyles();
  const { allCoaches, allJobSeekers } = props;
  const [currentCoach, setCurrentCoach] = useState(undefined);
  const [currentJobSeekers, setCurrentJobSeekers] = useState([]);
  const [showAllJobSeekers, setShowAllJobSeekers] = useState(true);
  const [currentAssignments, dispatch] = useReducer(assignmentsReducer, {});
  const { updateUser } = useUser();

  const hasAssignment = useCallback(uid => currentAssignments[currentCoach.uid].includes(uid), [
    currentAssignments,
    currentCoach,
  ]);

  useEffect(() => {
    if (showAllJobSeekers) {
      setCurrentJobSeekers(allJobSeekers);
    } else {
      setCurrentJobSeekers(jobSeekers => (
        jobSeekers.filter(jobSeeker => hasAssignment(jobSeeker.uid))
      ));
    }
  }, [allJobSeekers, hasAssignment, showAllJobSeekers]);

  const handleSelectCoach = (event) => {
    const selectedCoach = allCoaches.find(coach => coach.uid === event.currentTarget.dataset.uid);
    setCurrentCoach(selectedCoach);
    dispatch({
      type: 'set',
      coachUid: selectedCoach.uid,
      assignmentIds: selectedCoach.coachAssignments,
    });
    setCurrentJobSeekers(allJobSeekers);
  };

  const handleClickJobSeeker = (event, checked) => {
    const { uid } = event.currentTarget.dataset;
    if (checked) {
      updateUser(currentCoach.uid, {
        assignments: firebase.firestore.FieldValue.arrayUnion(uid),
      });
      dispatch({ type: 'add', coachUid: currentCoach.uid, uid });
    } else {
      updateUser(currentCoach.uid, {
        assignments: firebase.firestore.FieldValue.arrayRemove(uid),
      });
      dispatch({ type: 'remove', coachUid: currentCoach.uid, uid });
    }
  };

  const handleShowAllJobSeekers = (event, checked) => {
    setShowAllJobSeekers(checked);
  };

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container direction="row" justify="space-between" alignItems="flex-start">
          <Grid item>
            <List className={classes.assignments}>
              {allCoaches.map(coach => (
                <ListItem
                  button
                  onClick={handleSelectCoach}
                  key={coach.uid}
                  data-uid={coach.uid}
                  selected={currentCoach && currentCoach.uid === coach.uid}
                >
                  <ListItemAvatar>
                    <Avatar src={coach.authProfile.photoURL} alt={coach.authProfile.displayName}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={coach.authProfile.displayName}
                    secondary={coach.authProfile.email}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={9}>
            {!currentCoach && (
              <Typography variant="subtitle2" align="center" className={classes.subtitle}>
                Click one of the coaches on the left to assign the job seekers
              </Typography>
            )}
            {currentCoach && (
              <Grid container>
                <Grid item xs={12}>
                  <FormGroup row className={classes.jobSeekersSwitch}>
                    <FormControlLabel
                      label="Show all"
                      control={(
                        <Switch
                          checked={showAllJobSeekers}
                          onChange={handleShowAllJobSeekers}
                          inputProps={{ 'data-testid': 'jobSeekersSwitch' }}
                        />
)}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.root}>
                    <Table className={classes.table} size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Phone Number</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentJobSeekers.map(jobSeeker => (
                          <TableRow
                            key={jobSeeker.uid}
                            hover
                            selected={hasAssignment(jobSeeker.uid)}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={hasAssignment(jobSeeker.uid)}
                                onChange={handleClickJobSeeker}
                                inputProps={{
                                  'data-uid': jobSeeker.uid,
                                  'data-testid': jobSeeker.uid,
                                }}
                              />
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <ListItem>
                                <ListItemIcon>
                                  <Avatar
                                    src={jobSeeker.authProfile.photoURL}
                                    alt={jobSeeker.authProfile.displayName}
                                  >
                                    <PersonIcon />
                                  </Avatar>
                                </ListItemIcon>
                                <ListItemText primary={jobSeeker.authProfile.displayName} />
                              </ListItem>
                            </TableCell>
                            <TableCell>{jobSeeker.authProfile.email}</TableCell>
                            <TableCell>{jobSeeker.authProfile.phoneNumber}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

CoachAssignments.propTypes = {
  allCoaches: PropTypes.arrayOf(PropTypes.instanceOf(User)).isRequired,
  allJobSeekers: PropTypes.arrayOf(PropTypes.instanceOf(User)).isRequired,
};
