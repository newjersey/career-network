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
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useAnalytics } from '../Analytics';
import { useAuth } from '../Auth';
import AutocompleteDropdown from './AutocompleteDropdown';
import CountyList from './CountyList';
import employmentInputValidation from './EmploymentInputValidation';
import FavorabilityDialog from './FavorabilityDialog';
import IndustryDropdown from './IndustryDropdown';
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
  const formId = 'employment-outlook';
  const analytics = useAnalytics();
  const { userDocRef } = useAuth();
  const [searching, setSearching] = useState(false);

  const initialState = {
    occupation: '',
    county: '',
    title: '',
    industry: '',
  };

  const submit = values => {
    setSearching(true);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const employmentOutlook = {
      occupation: values.occupation,
      county: values.county,
      title: values.title,
      industry: values.industry,
      timestamp,
    };
    userDocRef.set({ employmentOutlook }, { merge: true }).then(() => {
      window.Intercom('update', { 'last-employment-outlook-input': new Date() });
      analytics.trackEvent('employment-outlook-input', {
        occupation: employmentOutlook.occupation,
        county: employmentOutlook.county,
      });
    });
  };

  const { handleSubmit, handleChange, handleChangeCustom, values, errors } = useFormValidation(
    initialState,
    employmentInputValidation,
    submit
  );

  const handleClose = () => {
    setSearching(false);
  };

  return (
    <form id={formId}>
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
          Location
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '2em' }}>
          Where are you looking for work? You may only select one location at a time.
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
      <Divider />
      <Box mt={8} mb={6}>
        <Typography variant="h6" gutterBottom>
          Additional Details
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '2em' }}>
          Tell us, in your own words, about the occupation you selected above so we can improve our
          results for you in the future.
        </Typography>
        <FormControl fullWidth>
          <span>Job Title</span>
          <TextField
            inputProps={{ name: 'title' }}
            placeholder="If the job title you desire differs from the job title you selected above, what would you use?"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            value={values.title}
            style={{ marginBottom: '2em' }}
          />
        </FormControl>
        <IndustryDropdown value={values.industry} onChange={handleChange} />
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
    </form>
  );
}

Hits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Search;
