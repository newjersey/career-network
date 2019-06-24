import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../Airtable/PropTypes';
import Resource from './Resource';

export default function ResourceList(props) {
  const { resources, title } = props;

  return (
    <section>
      {title && (
        <Typography variant="subtitle2" gutterBottom>
          {title}
        </Typography>
      )}

      {resources.map(resource => (
        <Resource resource={resource} key={resource.id} />
      ))}
    </section>
  );
}

ResourceList.propTypes = {
  resources: AirtablePropTypes.resources.isRequired,
  title: PropTypes.string,
};

ResourceList.defaultProps = {
  title: null,
};
