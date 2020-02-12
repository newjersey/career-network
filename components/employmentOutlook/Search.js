import { InstantSearch, Configure, connectHits } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import firebase from 'firebase/app';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';
import AutocompleteDropdown from './AutocompleteDropdown';
import CountyList from './CountyList';
import FavorabilityDialog from './FavorabilityDialog';
import employmentInputValidation from './EmploymentInputValidation';
import useFormValidation from '../formValidationHook';

const searchClient = algoliasearch(process.env.algolia.appId, process.env.algolia.apiKey);
const searchIndex = process.env.algolia.indexName;

function Hits(props) {
  const { hits, show, onClose } = props;
  if (hits.length > 0) {
    const hit = hits[0];
    return (
      <FavorabilityDialog
        favorabilityValue={hit.Descriptor}
        growth={hit.GrowthRates}
        size={hit['Total Openings']}
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
  const { userDocRef } = useAuth();
  const [searching, setSearching] = useState(false);

  const initialState = {
    occupation: '',
    county: '',
  };

  const submit = values => {
    setSearching(true);

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const employmentOutlook = {
      occupation: values.occupation,
      county: values.county,
      timestamp,
    };
    userDocRef.set({ employmentOutlook }, { merge: true }).then(() => {
      window.Intercom('update', { 'last-employment-outlook-input': new Date() });
      window.Intercom('trackEvent', 'employment-outlook-input', {
        occupation: employmentOutlook.occupation,
        county: employmentOutlook.county,
      });
    });
  };

  const { handleSubmit, handleChangeCustom, values, errors } = useFormValidation(
    initialState,
    employmentInputValidation,
    submit
  );

  const handleClose = () => {
    setSearching(false);
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
        <FormControl fullWidth error={!!errors.occupation}>
          <AutocompleteDropdown
            value={values.occupation}
            onChange={o => handleChangeCustom('occupation', o)}
            searchClient={searchClient}
            indexName={searchIndex}
          />
          {!!errors.occupation && <FormHelperText>{errors.occupation}</FormHelperText>}
        </FormControl>
      </Box>
      <Divider />
      <Box mt={8} mb={6}>
        <Typography variant="h6" gutterBottom>
          County
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '2em' }}>
          Where are you looking for work? You may only select one county at a time.
        </Typography>
        <FormControl fullWidth error={!!errors.county}>
          <CountyList
            filter={values.occupation}
            searchClient={searchClient}
            indexName={searchIndex}
            value={values.county}
            onChange={c => handleChangeCustom('county', c)}
          />
          {!!errors.county && <FormHelperText>{errors.county}</FormHelperText>}
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Explore Favorability
        </Button>
      </Box>
      {searching && (
        <InstantSearch indexName={searchIndex} searchClient={searchClient}>
          <Configure
            query={values.occupation}
            filters={`county:"${values.county}"`}
            hitsPerPage={1}
          />
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
