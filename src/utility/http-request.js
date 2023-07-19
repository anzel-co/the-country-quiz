import { useState, useCallback } from 'react';

export const useHttpRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchRequest = useCallback(
    async (url, method = 'GET', headers = {}, body = null) => {
      setLoading(true);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setLoading(false);
        return data;
      } catch (err) {
        setError(err.message);
        setLoading(false);
        throw err;
      }
    }, []);

  return { loading, error, fetchRequest};
};
