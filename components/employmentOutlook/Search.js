import { InstantSearch, Configure, connectHits } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AutocompleteDropdown from './AutocompleteDropdown';
import CountyList from './CountyList';
import FavorabilityDialog from './FavorabilityDialog';

const searchClient = algoliasearch('GVXRTXREAI', '327775f382e4df7687f8a578e64e238b');

function Hits(props) {
  const { hits, show, onClose } = props;
  if (hits.length > 0) {
    const hit = hits[0];
    return (
      <FavorabilityDialog
        favorabilityValue={hit.Descriptor}
        occupation={hit.Occupation}
        county={hit.county}
        onClose={onClose}
        show={show}
      />
    );
  }
  return null;
}

const CustomHits = connectHits(Hits);

function Search() {
  const [occupation, setOccupation] = useState('');
  const [county, setCounty] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    setSubmitting(false);
  };

  return (
    <>
      <Box mt={5} mb={10}>
        <Typography variant="h6" gutterBottom>
          Occupation
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '2em' }}>
          What job are you looking for? Select the job that most closely matches the one you are
          looking for.
        </Typography>
        <AutocompleteDropdown onChange={e => setOccupation(e)} />
      </Box>
      <Divider />
      <Box mt={8} mb={8}>
        <Typography variant="h6" gutterBottom>
          County
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '2em' }}>
          Where are you looking for work? You may only select one county at a time.
        </Typography>
        <CountyList county={county} onChange={e => setCounty(e)} />
      </Box>
      <Button variant="contained" size="large" color="primary" onClick={() => setSubmitting(true)}>
        Explore Favorability
      </Button>
      {submitting && (
        <InstantSearch indexName="test_prod_EMPLOYMENT_PROSPECTS" searchClient={searchClient}>
          <Configure query={occupation} filters={`county:"${county}"`} hitsPerPage={1} />
          <CustomHits show onClose={handleClose} />
        </InstantSearch>
      )}
    </>
  );
}

Hits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Search;
