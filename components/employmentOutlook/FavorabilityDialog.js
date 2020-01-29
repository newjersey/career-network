import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { DialogContent, DialogTitle, DialogActions } from '../DialogComponents';

const FAVORABILITY_TYPE = [
  {
    value: 'Very Unfavorable',
    color: '#f96861',
    growth: 'Declining',
    size: 'Small',
    description: `The outlook for this job isn't so good. You may need to expand your search to other counties or switch to another occupation." Right now we don't have any info on the platform about this, so we would need to add activities and figure out how to play this out.`,
  },
  {
    value: 'Unfavorable',
    color: '#fea830',
    growth: 'Slow',
    size: 'Medium',
    description: `The future looks good for this job! The New Jersey Career Network can help you follow the steps you need to take to get employed. 
    Start by using our employment log to keep track of your day-to-day job search activities. Tracking your search is one of the keys to success. It will also help us learn more about what you're doing so we can recommend the right actions.`,
  },
  {
    value: 'Favorable',
    color: '#244cd2',
    growth: 'Fast',
    size: 'Medium',
    description: `The outlook for this job isn't so good. You may need to expand your search to other counties or switch to another occupation." Right now we don't have any info on the platform about this, so we would need to add activities and figure out how to play this out.`,
  },
  {
    value: 'Very Favorable',
    color: '#6bce7a',
    growth: 'Moderate',
    size: 'Large',
    description: `The outlook for this job isn't so good. You may need to expand your search to other counties or switch to another occupation." Right now we don't have any info on the platform about this, so we would need to add activities and figure out how to play this out.`,
  },
];

const getFavorability = favorabilityTypeValue =>
  FAVORABILITY_TYPE.find(favorabilityType => favorabilityType.value === favorabilityTypeValue);

const MAX_WIDTH = 'sm';

export default function FavorabilityDialog(props) {
  const { show, onClose, occupation, county, favorabilityValue } = props;
  const favorability = getFavorability(favorabilityValue);

  return (
    <Dialog fullWidth maxWidth={MAX_WIDTH} open={show} aria-labelledby="favorability-dialog">
      <DialogTitle
        id="favorability-dialog"
        onClose={onClose}
        style={{
          backgroundColor: favorability.color,
          opacity: 0.08,
          height: '130px',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body1">This Occupation is ...</Typography>
        <Typography variant="h6">{favorability.value}</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          If you are looking at being a {occupation} in {county}
          <br />
          The Department of Labor projects this occupation is projected to have a{' '}
          {favorability.growth} growth rate with a {favorability.size} pool of job openings in your
          county through 2026.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {favorability.description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FavorabilityDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  occupation: PropTypes.string.isRequired,
  county: PropTypes.string.isRequired,
  favorabilityValue: PropTypes.string.isRequired,
};
