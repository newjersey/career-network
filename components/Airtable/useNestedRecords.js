import { useState, useEffect } from 'react';
import useRecords from './useRecords';

export default function useNestedRecords(params) {
  const {
    parentRecordsApiPath,
    childRecordsApiPath,
    childIdColumnName,
    childPropertyName = 'items',
  } = params;

  const [records, setRecords] = useState([]);
  const parentRecords = useRecords(parentRecordsApiPath);
  const childRecords = useRecords(childRecordsApiPath);

  useEffect(() => {
    parentRecords
      .filter(parent => parent.fields[childIdColumnName])
      .forEach(parent => {
        const childIds = parent.fields[childIdColumnName];

        // eslint-disable-next-line no-param-reassign
        parent[childPropertyName] = childIds
          .map(itemId => childRecords.find(item => item.id === itemId))
          .filter(item => item);
      });

    setRecords(parentRecords.filter(parent => parent[childPropertyName].length));
  }, [parentRecords, childRecords, childIdColumnName, childPropertyName]);

  return records;
}
