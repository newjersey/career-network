import PropTypes from 'prop-types';
import React from 'react';

function EmojiCircle(props) {
  const { emoji, diameter, fillColor, stroke, strokeWidth } = props;
  const coordinateForCircle = diameter / 2;
  const radius = (diameter - 2 * strokeWidth) / 2;
  const emojiSize = diameter * 0.6;
  const coordinateXForEmoji = coordinateForCircle - emojiSize / 2;
  const coordinateYForEmoji = coordinateForCircle + emojiSize / 2 - strokeWidth * 4;

  return (
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
        <text x={coordinateXForEmoji} y={coordinateYForEmoji} fontSize={emojiSize}>
          {emoji}
        </text>
      </g>
    </svg>
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
