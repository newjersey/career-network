import { InstantSearch, Configure, connectHits } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import firebase from 'firebase/app';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { useAuth } from '../Auth';
import AutocompleteDropdown from './AutocompleteDropdown';
import CountyList from './CountyList';
import FavorabilityDialog from './FavorabilityDialog';
import useFormValidation from '../formValidationHook';
import employmentInputValidation from './EmploymentInputValidation';

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
  return (
    <Dialog open onClose={onClose}>
      <Typography variant="h2">No data found!</Typography>
    </Dialog>
  );
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
    userDocRef.set({ employmentOutlook }, { merge: true });
  };

  const { handleSubmit, handleChangeCustom, values, errors, reset } = useFormValidation(
    initialState,
    employmentInputValidation,
    submit
  );

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
          <CountyList
            filter={values.occupation}
            searchClient={searchClient}
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
        <InstantSearch indexName="test_prod_EMPLOYMENT_PROSPECTS" searchClient={searchClient}>
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
