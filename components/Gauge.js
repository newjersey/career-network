import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Gauge(props) {
  const { diameter, stroke, strokeWidth, percentage, label } = props;
  const calculatedPercent = Math.trunc(percentage * 100);
  const coordinateForCircle = diameter / 2;
  const radius = (diameter - 2 * strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const semiCirclePercentage = (calculatedPercent / 100) * circumference;

  return (
    <Box mt={2} display="flex" justifyContent="center" alignItems="flex-end" position="relative">
      <svg width={diameter} height={diameter / 2} style={{ transform: 'rotateY(180deg)' }}>
        <defs>
          <linearGradient id="percentGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={stroke} />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <circle
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeOpacity="10%"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: circumference,
          }}
          strokeLinecap="round"
        />
        <circle
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill="none"
          stroke="url(#percentGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: semiCirclePercentage,
            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s',
          }}
          strokeLinecap="round"
        />
      </svg>
      <Box position="absolute" width={1}>
        <Typography variant="h5" align="center" style={{ fontWeight: 'bold' }}>
          {calculatedPercent}%
        </Typography>
        <Typography variant="body2" align="center">
          {label}
        </Typography>
      </Box>
    </Box>
  );
}

Gauge.propTypes = {
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  diameter: PropTypes.number,
  percentage: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

Gauge.defaultProps = {
  stroke: '#1881c5',
  strokeWidth: 10,
  diameter: 218,
};

export default Gauge;
