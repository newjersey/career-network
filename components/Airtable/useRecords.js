import { useEffect, useRef, useState } from 'react';
import Airtable from './Airtable';

export default function useAirtable(apiPath) {
  const [records, setRecords] = useState([]);
  const cleanupRef = useRef();

  useEffect(() => {
    (async () => {
      const result = await new Airtable().fetch(apiPath);
      cleanupRef.current = result;

      const json = await result.json();
      cleanupRef.current = json;

      setRecords(json.records);
    })();

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, [apiPath]);

  return records;
}
