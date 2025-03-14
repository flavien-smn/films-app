import { useEffect, useState } from 'react';

const useMovies = <T>(fectFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchDatas = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fectFunction();
      setData(result);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchDatas();
    }
  });

  return { data, loading, error, refetch: fetchDatas, reset };
};

export default useMovies;
