import { InstantSearch, Configure, connectHits } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import firebase from 'firebase/app';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { useAuth } from '../Auth';
import AutocompleteDropdown from './AutocompleteDropdown';
import CountyList from './CountyList';
import FavorabilityDialog from './FavorabilityDialog';
import IndustryDropdown from './IndustryDropdown';
import useFormValidation from '../formValidationHook';
import employmentInputValidation from './EmploymentInputValidation';

const searchClient = algoliasearch('3XON39SKZ0', '841e3368abde3ebfd860f89ddae4d60e');

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
  return (
    <Dialog open onClose={onClose}>
      <Typography variant="h2">No data found!</Typography>
    </Dialog>
  );
}

const CustomHits = connectHits(Hits);

function Search() {
  const formId = 'employment-outlook';
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
    userDocRef.set({ employmentOutlook }, { merge: true });
  };

  const {
    handleSubmit,
    handleChange,
    handleChangeCustom,
    values,
    errors,
    reset,
  } = useFormValidation(initialState, employmentInputValidation, submit);

  const handleClose = () => {
    reset();
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
          <CountyList value={values.county} onChange={c => handleChangeCustom('county', c)} />
          {!!errors.county && <FormHelperText>{errors.county}</FormHelperText>}
        </FormControl>
      </Box>
      <Divider />
      <Box mt={8} mb={6}>
        <Typography variant="h6" gutterBottom>
          Additional Details
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '2em' }}>
          Tell us more about the work you&apos;re looking for so we can improve our results for you
          in the future.
        </Typography>
        <FormControl fullWidth>
          <span>Job Title</span>
          <TextField
            id={`${formId}-title`}
            inputProps={{ name: 'title' }}
            placeholder="What job title do you feel is more relevant for this job?"
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
        <InstantSearch indexName="prod_EMPLOYMENT_PROSPECTS" searchClient={searchClient}>
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
