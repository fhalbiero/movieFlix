import { useEffect, useState } from "react";

interface Props<T> {
    fetchFunction: () => Promise<T>;
    autoFetch?: boolean;
}

export function useFetch<T>({ fetchFunction, autoFetch = true }: Props<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    async function fetchData() {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred while fetching data'));
        } finally {
            setLoading(false);
        }
    }

    function reset() {
        setData(null);
        setError(null);
        setLoading(false);
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [autoFetch]);

    return { data, loading, error, fetchData, reset };
}