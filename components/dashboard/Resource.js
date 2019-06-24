import Link from '@material-ui/core/Link';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../Airtable/PropTypes';

export default function Resource(props) {
  const { resource } = props;

  return (
    <article>
      <Link href={resource.fields.URL} target="_blank">
        <Typography component="h5" variant="subtitle1">
          <strong>{resource.fields.Name}</strong>
        </Typography>
      </Link>

      <Typography variant="body1">
        {resource.fields.Description}
      </Typography>
    </article>
  );
}

Resource.propTypes = {
  resource: AirtablePropTypes.resource.isRequired,
};
