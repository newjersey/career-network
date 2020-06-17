import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ScaffoldContainer from '../ScaffoldContainer';
import QuestionGroup from './QuestionGroup';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
    backgroundColor: '#fefdf8',
  },
}));

function Section({ sectionData }) {
  const classes = useStyles();

  const getContentComponent = contentItem => {
    if (contentItem.component === 'text') {
      return <Typography variant="body1">{contentItem.content}</Typography>;
    }
    if (contentItem.component === 'practice_question_group') {
      return <QuestionGroup questions={contentItem.questions} />;
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
};

Section.defaultProps = {};

export default Section;
