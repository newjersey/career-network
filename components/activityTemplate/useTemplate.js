import { useEffect, useRef, useState } from 'react';

export default function useTemplate(templateId) {
  const [template, setTemplate] = useState();
  const cleanupRef = useRef();

  useEffect(() => {
    (async () => {
      const result = await import(`../../activity-templates/${templateId}.json`);

      if (!cleanupRef.current) {
        setTemplate(result.default);
      }
    })();

    return () => {
      cleanupRef.current = true;
    };
  }, [templateId]);

  return template;
}
