import React, { useEffect, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import dayjs from 'dayjs';
import { basename } from 'path';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { Link } from '@material-ui/core';
import PropTypes from 'prop-types';

import useStorage from '../Firebase/useStorage';
import AirtablePropTypes from '../Airtable/PropTypes';

export default function ResponseValue(props) {
  const { download } = useStorage();
  const [downloadUrl, setDownloadUrl] = useState(undefined);
  const { response } = props;

  useEffect(() => {
    async function fetchUrl() {
      if (response.question.fields['Response Type'] === 'File' && response.value) {
        setDownloadUrl(await download(response.value));
      }
    }

    fetchUrl();
  }, [download, response]);

  const responseValue = () => {
    switch (response.question.fields['Response Type']) {
      case 'Option': {
        const responseOption = response.responseOptions.find(
          option => option.id === response.value,
        );
        return responseOption.fields.Name;
      }
      case 'Binary':
        return response.value ? 'Yes' : 'No';
      case 'Date':
        return dayjs(response.value).format('MM/DD/YYYY');
      case 'Link':
        return <Link href={sanitizeUrl(response.value)}>{response.value}</Link>;
      case 'File':
        return <Link href={downloadUrl}>{basename(response.value)}</Link>;
      default:
        return response.value;
    }
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <strong>{response.question.fields.Label}</strong>
      </TableCell>
      <TableCell>
        <span>{responseValue()}</span>
      </TableCell>
    </TableRow>
  );
}

ResponseValue.propTypes = {
  response: PropTypes.shape({
    responseOptions: AirtablePropTypes.questionResponseOptions,
    question: PropTypes.shape({
      fields: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Label: PropTypes.string.isRequired,
        'Response Type': PropTypes.string.isRequired,
      }),
    }).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }).isRequired,
};
