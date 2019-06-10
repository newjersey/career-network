import { useState, useEffect } from 'react';
import Airtable from './Airtable';

export default function useAirtable(apiPath) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await new Airtable().fetch(apiPath);
      const json = await result.json();

      setRecords(json.records);
    })();
  }, [apiPath]);

  return records;
}
