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
  county: {
    justifyContent: 'center',
  },
  countyButton: {
    width: '47%',
    height: theme.spacing(5),
    marginBottom: theme.spacing(2),
    margin: 'auto',
  },
}));

function Hits(props) {
  const { hits, onChange } = props;

  if (hits.length > 0) {
    const result = hits.map(option => option.county);
    const list = COUNY_NAMES.filter(c => !result.includes(c));
    onChange(list);
  }
  return null;
}

const CustomHits = connectHits(Hits);

export default function CountyList(props) {
  const classes = useStyles();
  const { value, onChange, filter, searchClient, indexName } = props;
  const [disablesList, setDisablesList] = useState([]);
  const [updating, setUpdating] = useState(false);

  const handleChange = list => {
    setDisablesList(list);
    setUpdating(false);
  };

  useEffect(() => {
    if (isEmpty(filter)) {
      setDisablesList([]);
      setUpdating(false);
    } else {
      setUpdating(true);
    }
  }, [filter]);

  return (
    <>
      {updating && (
        <InstantSearch indexName={indexName} searchClient={searchClient}>
          <Configure filters={`Occupation:"${filter}"`} hitsPerPage={30} distinct={false} />
          <CustomHits onChange={handleChange} />
        </InstantSearch>
      )}
      <ToggleButton
        buttonClassName={classes.countyButton}
        buttonVariant="outlined"
        containerProps={{ className: classes.county }}
        options={COUNY_NAMES}
        disabledOptions={disablesList}
        value={value}
        handleChange={onChange}
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
  indexName: PropTypes.string.isRequired,
};

CountyList.defaultProps = {
  filter: '',
};
