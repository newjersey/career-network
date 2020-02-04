import { InstantSearch, Configure, connectHits } from 'react-instantsearch-dom';
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ToggleButton from '../ToggleButton';

const COUNY_NAMES = [
  'New Jersey Statewide',
  'Atlantic County',
  'Bergen County',
  'Burlington County',
  'Camden County',
  'Cape May County',
  'Cumberland County',
  'Essex County',
  'Gloucester County',
  'Hudson County',
  'Hunterdon County',
  'Mercer County',
  'Middlesex County',
  'Monmouth County',
  'Morris County',
  'Ocean County',
  'Passaic County',
  'Salem County',
  'Somerset County',
  'Sussex County',
  'Union County',
  'Warren County',
];

const useStyles = makeStyles(theme => ({
  countyButton: {
    width: theme.spacing(35),
    height: theme.spacing(5),
    margin: theme.spacing(1, 1, 1, 1),
  },
}));

function Hits(props) {
  const { hits, onChange } = props;

  if (hits.length > 0) {
    const list = hits.map(option => option.county);
    onChange(list);
  }
  return null;
}

const CustomHits = connectHits(Hits);

export default function CountyList(props) {
  const classes = useStyles();
  const { value, onChange, filter, searchClient } = props;
  const [enabledList, setEnabledList] = useState(COUNY_NAMES);
  const [updating, setUpdating] = useState(false);

  const handleChange = list => {
    setEnabledList(list);
    setUpdating(false);
  };

  useEffect(() => {
    if (!isEmpty(filter)) {
      setUpdating(true);
    } else {
      setEnabledList(COUNY_NAMES);
      setUpdating(false);
    }
  }, [filter]);

  return (
    <>
      {updating && (
        <InstantSearch indexName="test_prod_EMPLOYMENT_PROSPECTS" searchClient={searchClient}>
          <Configure filters={`Occupation:"${filter}"`} hitsPerPage={30} />
          <CustomHits onChange={handleChange} />
        </InstantSearch>
      )}
      <ToggleButton
        buttonClassName={classes.countyButton}
        buttonVariant="outlined"
        options={COUNY_NAMES}
        enabledOptions={enabledList}
        value={value}
        handleChange={e => onChange(e)}
        showPopover
        disabledMessage="We're sorry. Data is not available for this job in this county."
      />
    </>
  );
}

Hits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

CountyList.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  searchClient: PropTypes.object.isRequired,
};

CountyList.defaultProps = {
  filter: '',
};
