/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import React from 'react';

const basePath = '/static/img/';
const mimeTypeMap = {
  png: 'image/png',
  jpg: 'image/jpeg',
};

function Picture(props) {
  const { path, fallbackType, alt, className, style } = props;
  const src = basePath + path;
  const fallbackSrc = basePath + path.replace(/webp$/, fallbackType);

  return path.endsWith('.webp') ? (
    <picture>
      <source type="image/webp" srcSet={src} />
      <source type={mimeTypeMap[fallbackType]} srcSet={fallbackSrc} />
      <img src={fallbackSrc} alt={alt} className={className} style={style} />
    </picture>
  ) : (
    <img src={src} alt={alt} className={className} style={style} />
  );
}

Picture.propTypes = {
  alt: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  fallbackType: PropTypes.oneOf(['png', 'jpg']).isRequired,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

Picture.defaultProps = {
  className: undefined,
  style: undefined,
};

export default Picture;
