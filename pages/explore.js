import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  RatingMenu,
  MenuSelect,
  Stats,
  NumericMenu,
} from 'react-instantsearch-dom';
import { makeStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch/lite';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

import ScaffoldContainer from '../components/ScaffoldContainer';
import withTitle from '../components/withTitle';

const useStyles = makeStyles(theme => ({
  '@global': {
    'li.ais-Hits-item': {
      width: 'calc(50% - 1rem)',
      backgroundColor: 'white',
      fontSize: '.9rem',
    },
    '.ais-Highlight > *': {
      fontSize: '1.2rem',
    },
  },
  stats: {
    marginLeft: -theme.spacing(2),
  },
}));

const searchClient = algoliasearch('3XON39SKZ0', '841e3368abde3ebfd860f89ddae4d60e');
const currency = n =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(n);

const Hit = props => {
  const { hit } = props;
  const classes = useStyles();

  return (
    <div>
      <Highlight attribute="Occupation" hit={hit} />

      <Box my={1}>
        <Chip
          size="small"
          label={hit.Descriptor}
          style={{
            backgroundColor: {
              'Very Favorable': '#c6f6d5',
              Favorable: '#bee3f8',
              Unfavorable: '#faf089',
              'Very Unfavorable': '#fed7d7',
            }[hit.Descriptor],
          }}
        />
      </Box>

      <p>
        In <strong>{hit.county}</strong>, the number of openings is{' '}
        <strong>{hit['Total Openings'].toLowerCase()}</strong> and the future growth rate is{' '}
        <strong>{hit.GrowthRates.toLowerCase()}</strong>.
      </p>
      <ul className={classes.stats}>
        {hit.meanann && (
          <li>
            Average Pay: <strong>{currency(hit.meanann)}</strong>
          </li>
        )}
        {hit.Education && (
          <li>
            Education: <strong>{hit.Education}</strong>
          </li>
        )}
        {hit['Work Exp_'] && (
          <li>
            Work Experience: <strong>{hit['Work Exp_']}</strong>
          </li>
        )}
      </ul>
    </div>
  );
};

function ExplorePage() {
  return (
    <ScaffoldContainer>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
          integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8="
          crossOrigin="anonymous"
        />
      </Head>
      <div className="ais-InstantSearch">
        <h1>Career Explorer</h1>
        <InstantSearch indexName="prod_EMPLOYMENT_PROSPECTS" searchClient={searchClient}>
          <Grid container>
            <Grid item md={4}>
              <div className="left-panel">
                <ClearRefinements />
                <h2>County</h2>
                <MenuSelect attribute="county" showMore />
                <h2>Education Requirement</h2>
                <RefinementList attribute="Education" />
                <Configure hitsPerPage={16} />
                <h2>Favorability</h2>
                <RatingMenu attribute="DescriptorRating" min={1} max={4} />
                <h2>Average Pay</h2>
                <NumericMenu
                  attribute="meanann"
                  items={[
                    { label: '<= $30,000', end: 30000 },
                    { label: '$30,000 - $60,000', start: 30000, end: 60000 },
                    { label: '$60,000 - $90,000', start: 60000, end: 90000 },
                    { label: '$90,000 - $120,000', start: 90000, end: 120000 },
                    { label: '>= $120,000', start: 120000 },
                  ]}
                />
              </div>
            </Grid>
            <Grid item md={8}>
              <Box align="right" mt={-1} mb={1}>
                <Stats />
              </Box>
              <SearchBox autoFocus />
              <br />
              <Hits hitComponent={Hit} />
              <br />
              <Pagination />
              <br />
            </Grid>
          </Grid>
        </InstantSearch>
      </div>
    </ScaffoldContainer>
  );
}

Hit.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  hit: PropTypes.object.isRequired,
};

export default withTitle(ExplorePage, 'Explore');
