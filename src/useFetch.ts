import { useState, useEffect } from "react";

export function useFetch(url: string) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setLoading(true)
        fetch(url, { signal: abortController.signal })
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => setError(error) )
            .finally( () => setLoading(false));

        return () => abortController.abort(); //when unmounted
    }, []);

    return { data, loading, error }
}
