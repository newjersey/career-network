import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { DialogContent, DialogTitle, DialogActions } from '../DialogComponents';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    verticalAlign: 'center',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(4),
  },
  emphasis: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  summary: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  description: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  button: {
    border: 'none',
    padding: 0,
    textDecoration: 'underline',
  },
  footer: {
    justifyContent: 'center',
    padding: theme.spacing(2, 0, 2, 0),
  },
}));

const FAVORABILITY_TYPES = {
  'Very Unfavorable': {
    color: '#f96861',
    description: `The outlook for this job isn't so good. You may need to expand your search to other counties or switch to another occupation. Right now we don't have any info on the platform about this, so we would need to add activities and figure out how to play this out.`,
  },
  Unfavorable: {
    color: '#fea830',
    description: `The outlook for this job isn't so good. You may need to expand your search to other counties or switch to another occupation. Right now we don't have any info on the platform about this, so we would need to add activities and figure out how to play this out.`,
  },
  favorable: {
    color: '#244cd2',
    description: `The future looks good for this job! The New Jersey Career Network can help you follow the steps you need to take to get employed. 
    Start by using our employment log to keep track of your day-to-day job search activities. Tracking your search is one of the keys to success. It will also help us learn more about what you're doing so we can recommend the right actions.`,
  },
  'Very Favorable': {
    color: '#6bce7a',
    description: `The future looks good for this job! The New Jersey Career Network can help you follow the steps you need to take to get employed. 
    Start by using our employment log to keep track of your day-to-day job search activities. Tracking your search is one of the keys to success. It will also help us learn more about what you're doing so we can recommend the right actions.`,
  },
};

const MAX_WIDTH = 'sm';

export default function FavorabilityDialog(props) {
  const classes = useStyles();
  const { show, onClose, occupation, county, favorabilityValue, growth, size } = props;
  const favorability = FAVORABILITY_TYPES[favorabilityValue];
  const exploreMore =
    favorabilityValue &&
    (favorabilityValue === 'Very Unfavorable' || favorabilityValue === 'Unfavorable');

  return (
    <Dialog
      fullWidth
      maxWidth={MAX_WIDTH}
      open={show}
      aria-labelledby="favorability-dialog"
      onExited={onClose}
    >
      <DialogTitle
        id="favorability-dialog"
        className={classes.title}
        onClose={onClose}
        style={{ backgroundColor: fade(favorability.color, 0.08) }}
      >
        <Typography variant="body1" gutterBottom>
          This Occupation is ...
        </Typography>
        <Typography variant="h4" className={classes.emphasis} style={{ color: favorability.color }}>
          {favorabilityValue}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography className={classes.summary} variant="body1">
          If you are looking at being a <strong>{occupation}</strong> in <strong>{county}</strong>
          <br />
          <br />
          The Department of Labor projects this occupation is projected to have a{' '}
          <span className={classes.emphasis}>{growth}</span> growth rate with a{' '}
          <span className={classes.emphasis}>{size}</span> pool of job openings in your county
          through 2026.
        </Typography>
        <Divider />
        <Typography className={classes.description} variant="body1" color="textSecondary">
          {favorability.description}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.footer}>
        {exploreMore ? (
          <Typography>
            Want to explore another county?{' '}
            <Button className={classes.button} onClick={onClose} color="primary">
              Explore More
            </Button>
          </Typography>
        ) : (
          <Typography>
            Ready to complete some activities?{' '}
            <NextLink href="/dashboard">
              <a href="/dashboard">RETURN TO DASHBOARD</a>
            </NextLink>
          </Typography>
        )}
      </DialogActions>
    </Dialog>
  );
}

FavorabilityDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  occupation: PropTypes.string.isRequired,
  growth: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  county: PropTypes.string.isRequired,
  favorabilityValue: PropTypes.string.isRequired,
};
