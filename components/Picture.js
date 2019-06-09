import PropTypes from 'prop-types';
import React from 'react';

const basePath = '/static/img/';
const mimeTypeMap = {
  png: 'image/png',
  jpg: 'image/jpeg',
};

function Picture(props) {
  const { path, fallbackType, ...restProps } = props;
  const src = basePath + path;
  const fallbackSrc = basePath + path.replace(/webp$/, fallbackType);

  return (
    path.endsWith('.webp') ?
      <picture>
        <source type="image/webp" srcSet={src} />
        <source type={mimeTypeMap[fallbackType]} srcSet={fallbackSrc} />
        <img src={fallbackSrc} {...restProps} />
      </picture>
      :
      <img src={src} {...restProps} />
  );
}

Picture.propTypes = {
  alt: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  fallbackType: PropTypes.oneOf(['png', 'jpg']),
};

export default (Picture);
