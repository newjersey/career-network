import { InstantSearch, Hits, Configure } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AutocompleteDropdown from './AutocompleteDropdown';
import CountyList from './CountyList';
import FavorabilityDialog from './FavorabilityDialog';

const searchClient = algoliasearch('GVXRTXREAI', '327775f382e4df7687f8a578e64e238b');

const Hit = props => {
  const { hit, onClose } = props;
  return (
    <FavorabilityDialog
      favorabilityValue={hit.Descriptor}
      occupation={hit.Occupation}
      county={hit.county}
      onClose={onClose}
      show
    />
  );
};

function Search() {
  const [occupation, setOccupation] = useState('');
  const [county, setCounty] = useState('');
  const [submitting, setSubmitting] = useState(false);

  return (
    <Box>
      <AutocompleteDropdown onChange={e => setOccupation(e)} />
      <Divider />
      <CountyList county={county} onChange={e => setCounty(e)} />
      <Button variant="contained" size="large" color="primary" onClick={() => setSubmitting(true)}>
        Explore Favorability
      </Button>
      {submitting && (
        <InstantSearch indexName="test_prod_EMPLOYMENT_PROSPECTS" searchClient={searchClient}>
          <Configure query={occupation} filters={`county:"${county}"`} hitsPerPage={1} />
          <Hits hitComponent={Hit} onClose={setSubmitting} />
        </InstantSearch>
      )}
    </Box>
  );
}

Hit.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  hit: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Search;
