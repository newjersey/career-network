import { InstantSearch, Configure, connectAutoComplete } from 'react-instantsearch-dom';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  wrapIcon: {
    display: 'inline-flex',
  },
}));

function AutocompleteSearch(props) {
  const { hits, currentRefinement, refine, onDropdownValueChange, value } = props;
  const classes = useStyles();
  const options = hits.map(option => option.Occupation);

  return (
    <Autocomplete
      id="occupation-autocomplete-select"
      options={options}
      noOptionsText={
        <>
          <Typography style={{ fontWeight: 'bold' }} gutterBottom>
            Sorry, we couldn&apos;t find any occupations matching your search.{' '}
          </Typography>
          <Typography>You may want to check spelling or try searching with other terms.</Typography>
        </>
      }
      value={value}
      filterOptions={occupations => occupations}
      onInputChange={(event, val) => refine(val)}
      onChange={(event, val) =>
        isEmpty(val) ? onDropdownValueChange('') : onDropdownValueChange(val)
      }
      renderInput={params => (
        <TextField
          variant="outlined"
          {...params}
          value={currentRefinement}
          label={
            <div className={classes.wrapIcon}>
              <SearchIcon style={{ marginRight: '0.5rem', marginTop: '-0.2rem' }} /> Search or
              Select an Occupation
            </div>
          }
          fullWidth
        />
      )}
    />
  );
}

AutocompleteSearch.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onDropdownValueChange: PropTypes.func.isRequired,
};

const CustomAutocomplete = connectAutoComplete(AutocompleteSearch);

function AutocompleteDropdown(props) {
  const { value, onChange, searchClient, indexName } = props;
  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <Configure hitsPerPage={1000} />
      <CustomAutocomplete value={value} onDropdownValueChange={onChange} />
    </InstantSearch>
  );
}

AutocompleteDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  searchClient: PropTypes.object.isRequired,
  indexName: PropTypes.string.isRequired,
};

export default AutocompleteDropdown;
