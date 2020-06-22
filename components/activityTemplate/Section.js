import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ScaffoldContainer from '../ScaffoldContainer';
import QuestionGroup from './QuestionGroup';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
    backgroundColor: '#fefdf8',
  },
}));

function Section({ sectionData, templateSlug, allPracticeQuestionInputs }) {
  const classes = useStyles();

  const getContentComponent = contentItem => {
    if (contentItem.component === 'text') {
      return (
        <Box mb={4}>
          <Typography variant="body1">{contentItem.content}</Typography>
        </Box>
      );
    }
    if (contentItem.component === 'practice_question_group') {
      return (
        <QuestionGroup
          questions={contentItem.questions}
          templateSlug={templateSlug}
          allPracticeQuestionInputs={allPracticeQuestionInputs}
        />
      );
    }
    return null;
  };

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container justify="center">
          <Grid item container xs={12} sm={4}>
            <Typography className={classes.title} component="h2" variant="h3">
              {sectionData.name}
            </Typography>
          </Grid>
          <Grid item container xs={12} sm={6}>
            {sectionData.content.map(contentItem => getContentComponent(contentItem))}
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

Section.propTypes = {
  sectionData: PropTypes.objectOf(PropTypes.any).isRequired,
  templateSlug: PropTypes.string.isRequired,
  allPracticeQuestionInputs: FirebasePropTypes.querySnapshot.isRequired,
};

export default Section;
