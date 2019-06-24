import { useEffect, useRef, useState } from 'react';
import Airtable from './Airtable';

export default function useAirtable(apiPath) {
  const [records, setRecords] = useState([]);
  const cleanupRef = useRef();

  const fetchJson = async (_apiPath, offset) => {
    let path = _apiPath;

    if (offset) {
      const separator = path.includes('?') ? '&' : '?';
      path += `${separator}offset=${offset}`;
    }

    cleanupRef.current = new Airtable().fetch(path);
    const result = await cleanupRef.current;

    cleanupRef.current = result.json();
    const json = await cleanupRef.current;

    return json;
  };

  useEffect(() => {
    (async () => {
      let offset = null;
      let recordsAccum = [];

      do {
        // eslint-disable-next-line no-await-in-loop
        const result = await fetchJson(apiPath, offset);

        ({ offset } = result);
        recordsAccum = recordsAccum.concat(result.records);
      } while (offset);

      setRecords(recordsAccum);
    })();

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, [apiPath]);

  return records;
}
