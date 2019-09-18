import { useEffect, useRef, useState } from 'react';

const { fetchRecords } = require('../../src/airtable');

const { apiBase } = process.env.airtable;

export default function useRecords(apiPath) {
  const [records, setRecords] = useState([]);
  const cleanupRef = useRef();

  useEffect(() => {
    (async () => {
      const result = await fetchRecords(apiBase, apiPath);

      if (!cleanupRef.current) {
        setRecords(result);
      }
    })();

    return () => {
      cleanupRef.current = true;
    };
  }, [apiPath]);

  return records;
}
