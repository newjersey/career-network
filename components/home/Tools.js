import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ScaffoldContainer from '../ScaffoldContainer';

import { toolItems } from './content/TOOLS_CONTENT';

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
    color: '#0c4163',
    textAlign: 'left',
  },
  content: {
    fontWeight: 'lighter',
    color: '#2f2f34',
  },
  titleContainer: {
    marginTop: '3rem',
    textAlign: 'center',
    color: '#0c4163',
  },
  media: {
    borderRadius: '50%',
    height: 60,
    width: 60,
    margin: '0 auto 1.5vh',
  },
  divider: {
    margin: '5vh 45% 0',
    backgroundColor: '#0c4163',
  },
}));

function Tools() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid container justify="center" alignItems="center" spacing={10}>
          <Grid item xs={12} sm={12} className={classes.titleContainer}>
            <Typography variant="overline">Featuring</Typography>
            <Typography variant="h3">
              The tools you&apos;ll
              <br /> need to succeed
            </Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Grid container item>
              {toolItems.map(item => (
                <Grid item key={item.heading} xs={12} sm={4}>
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

export default Tools;
