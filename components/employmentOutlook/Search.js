import { makeStyles } from '@material-ui/styles';
import { connectHits, InstantSearch, SearchBox, Stats } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  list: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: 400,
    border: '2px solid',
    borderTop: '0px',
    borderColor: theme.palette.background.info,
  },
}));

const searchClient = algoliasearch('GVXRTXREAI', '327775f382e4df7687f8a578e64e238b');

function Hits({ hits }) {
  const classes = useStyles();

  return (
    <List
      className={classes.list}
      subheader={
        <ListSubheader>
          <Stats
            translations={{
              stats(nbHits) {
                return nbHits > 0
                  ? `Occupations (${nbHits} results)`
                  : `Sorry. We couldn’t find any occupations matching your search. Try using some similar terms.`;
              },
            }}
          />
        </ListSubheader>
      }
    >
      {hits.map(hit => (
        <ListItem button key={hit.objectID} style={{ fontWeight: 500 }}>
          {hit.Occupation}
        </ListItem>
      ))}
    </List>
  );
}
const CustomHits = connectHits(Hits);

function Search() {
  return (
    <InstantSearch indexName="DISTINCT_OCCUPATION" searchClient={searchClient}>
      <SearchBox autoFocus translations={{ placeholder: 'Search or Select an Occupation' }} />
      <CustomHits />
    </InstantSearch>
  );
}

Hits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Search;
