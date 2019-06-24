import { useEffect, useRef, useState } from 'react';
import Airtable from './Airtable';

export default function useAirtable(apiPath) {
  const [records, setRecords] = useState([]);
  const cleanupRef = useRef();

  useEffect(() => {
    const fetchJson = async (offset) => {
      let path = apiPath;

      if (offset) {
        const separator = path.includes('?') ? '&' : '?';
        path += `${separator}offset=${offset}`;
      }

      const result = await new Airtable().fetch(path);

      return result.json();
    };

    (async () => {
      let offset = null;
      let recordsAccum = [];

      do {
        // eslint-disable-next-line no-await-in-loop
        const result = await fetchJson(offset);

        ({ offset } = result);
        recordsAccum = recordsAccum.concat(result.records);
      } while (offset);

      if (!cleanupRef.current) {
        setRecords(recordsAccum);
      }
    })();

    return () => {
      cleanupRef.current = true;
    };
  }, [apiPath]);

  return records;
}
