import { InstantSearch, Configure, connectAutoComplete } from 'react-instantsearch-dom';
import { makeStyles } from '@material-ui/styles';
import algoliasearch from 'algoliasearch/lite';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const searchClient = algoliasearch('GVXRTXREAI', '327775f382e4df7687f8a578e64e238b');

const useStyles = makeStyles(() => ({
  wrapIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex',
  },
}));

function AutocompleteSearch({ hits, currentRefinement, refine }) {
  const classes = useStyles();
  const options = hits.map(option => ({
    default: `Occupations (${hits.length} results)`,
    ...option,
  }));

  return (
    <>
      <Autocomplete
        id="occupation-autocomplete-select"
        options={options}
        groupBy={option => option.default}
        getOptionLabel={option => option.Occupation}
        style={{ width: '100%' }}
        onInputChange={event => refine(event.currentTarget.value)}
        renderInput={params => (
          <TextField
            {...params}
            icon={<SearchIcon />}
            value={currentRefinement}
            label={
              <Typography className={classes.wrapIcon}>
                <SearchIcon style={{ marginRight: '0.5rem' }} /> Search or Select an Occupation
              </Typography>
            }
            variant="outlined"
            fullWidth
          />
        )}
      />
    </>
  );
}

AutocompleteSearch.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};

const CustomAutocomplete = connectAutoComplete(AutocompleteSearch);

const AutocompleteDropdown = () => (
  <InstantSearch searchClient={searchClient} indexName="DISTINCT_OCCUPATION">
    <Configure hitsPerPage={1000} />
    <CustomAutocomplete />
  </InstantSearch>
);

export default AutocompleteDropdown;
