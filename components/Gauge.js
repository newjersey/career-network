import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    position: 'relative',
  },
  percentageValue: {
    width: '100%',
    left: '0',
    bottom: '0',
    position: 'absolute',
  },
}));

function Gauge(props) {
  const classes = useStyles();
  const { diameter, stroke, strokeWidth, background, percentage } = props;
  const coordinateForCircle = diameter / 2;
  const radius = (diameter - 2 * strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const semiCirclePercentage = percentage * circumference;

  return (
    <div className={classes.root}>
      <svg
        width={diameter}
        height={diameter / 2}
        style={{ transform: 'rotateY(180deg)', overflow: 'hidden' }}
      >
        <circle
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill="none"
          stroke={background}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: circumference,
          }}
        />
        <circle
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: semiCirclePercentage,
            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s',
          }}
        />
      </svg>
      <span className={classes.percentageValue}>
        <Typography variant="h5" align="center">
          {percentage * 100}%
        </Typography>
        <Typography variant="body2" align="center">
          feeling confident
        </Typography>
      </span>
    </div>
  );
}

Gauge.propTypes = {
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  background: PropTypes.string,
  diameter: PropTypes.number,
  percentage: PropTypes.number.isRequired,
};

Gauge.defaultProps = {
  stroke: '#02B732',
  strokeWidth: 10,
  background: '#D0D0CE',
  diameter: 200,
};

export default Gauge;
