import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiCardContent-root': {
      padding: '0.5rem 1rem 2rem',
    },
    '& .MuiGrid-spacing-xs-10': {
      padding: '1rem',
    },
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  heading: {
    fontWeight: 'bold',
    color: '#598fe0',
    width: '90%',
  },
  content: {
    fontWeight: 'lighter',
    color: '#598fe0',
  },
  contentContainer: {
    textAlign: 'left',
    marginTop: '3rem',
  },
  media: {
    borderRadius: '50%',
    height: 50,
    width: 50,
    marginLeft: '1rem',
  },
}));

function Tools(props) {
  const { toolsContent } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={5} className={classes.contentContainer}>
            <Typography variant="overline" style={{ color: '#598fe0' }}>
              Featuring
            </Typography>
            <Typography variant="h3" className={classes.heading}>
              The tools you&apos;ll need to succeed
            </Typography>
            <Typography
              variant="body2"
              className={classes.content}
              style={{ paddingTop: '1.5rem', width: '70%' }}
            >
              You are the only one who can get yourself a job, but we&apos;ve created a platform to
              provide you with the tools and knowledge you need to make it all happen.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Grid container item>
              {toolsContent.map(item => (
                <Grid item key={item.heading} xs={12} sm={6}>
                  <Card>
                    <CardMedia className={classes.media} image={`${item.img}`} alt={item.heading} />
                    <CardContent>
                      <Typography variant="subtitle1" className={classes.heading}>
                        {item.heading}
                      </Typography>
                      <Typography variant="body2" component="p" className={classes.content}>
                        {item.content}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </ScaffoldContainer>
    </div>
  );
}

Tools.propTypes = {
  toolsContent: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Tools;
