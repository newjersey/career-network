import PropTypes from 'prop-types';
import React from 'react';

const basePath = '/static/img/';

class Picture extends React.Component {
  render() {
    const { path, fallbackType, ...restProps } = this.props;
    const src = basePath + path;
    const fallbackSrc = basePath + path.replace(/webp$/, fallbackType);

    if (fallbackType == 'jpg') {
      fallbackType = 'jpeg';
    }

    return (
      path.endsWith('.webp') ?
        <picture>
          <source type="image/webp" srcSet={src} />
          <source type={`image/${fallbackType}`} srcSet={fallbackSrc} />
          <img src={fallbackSrc} {...restProps} />
        </picture>
        :
        <img src={src} {...restProps} />
    );
  }
}

Picture.propTypes = {
  alt: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  fallbackType: PropTypes.oneOf(['png', 'jpg']),
};

export default (Picture);
