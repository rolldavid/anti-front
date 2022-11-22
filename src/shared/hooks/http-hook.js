import { useState, useCallback, useRef, useEffect } from 'react';

export const useHTTP = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    //prep to cancel active requests
    const activeHttpRequests = useRef([])

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);

        const httpAbort = new AbortController();
        activeHttpRequests.current.push(httpAbort);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbort.signal
            })

            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(reqController => reqController !== httpAbort);

            if (!response.ok) {
                throw new Error(responseData.message)
            }

            setIsLoading(false);
            return responseData;

        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }

    }, [])

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortController => abortController.abort());
        }
    }, []);

    return { isLoading, error, clearError, sendRequest }
};