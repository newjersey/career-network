import PropTypes from 'prop-types';
import React from 'react';

function EmojiCircle(props) {
  const { emoji, diameter, fillColor, stroke, strokeWidth } = props;
  const coordinateForCircle = diameter / 2;
  const radius = (diameter - 2 * strokeWidth) / 2;

  return (
    <>
      <svg height={diameter} width={diameter}>
        <g>
          <circle
            cx={coordinateForCircle}
            cy={coordinateForCircle}
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fillColor}
          />
        </g>
      </svg>
      <div style={{ marginTop: '-63.5px', fontSize: '33px' }}>{emoji}</div>
    </>
  );
}

EmojiCircle.propTypes = {
  emoji: PropTypes.string.isRequired,
  diameter: PropTypes.number,
  fillColor: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
};

EmojiCircle.defaultProps = {
  diameter: 56,
  fillColor: '#f7f8fa',
  stroke: '#e2e2ea',
  strokeWidth: 1,
};

export default EmojiCircle;
