import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import React, { useCallback, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

import AssessmentSectionList from '../assessment/AssessmentSectionList';
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
  const [scrollToY, setScrollToY] = useState(0);
  const [currentAssignment, setCurrentAssignment] = useState({
    authProfile: {},
    questionResponses: [],
  });
  const { assignments } = props;

  const handleClick = event => {
    setCurrentAssignment(
      assignments.find(
        assignment => assignment.authProfile.email === event.currentTarget.dataset.email
      )
    );
  };

  const scrollToRef = useCallback(node => {
    if (node !== null) {
      setScrollToY(node.offsetTop - 24);
    }
  }, []);

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          ref={scrollToRef}
        >
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
            {currentAssignment.authProfile.email &&
              (currentAssignment.assessmentConfiguration ? (
                <AssessmentSectionList
                  allQuestionResponses={currentAssignment.questionResponses}
                  scrollToY={scrollToY}
                  {...currentAssignment.assessmentConfiguration}
                  readOnly
                />
              ) : (
                <Typography variant="subtitle2" align="center" className={classes.subtitle}>
                  User has not completed assessment yet
                </Typography>
              ))}
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

Coaching.propTypes = CoachingPropTypes;
