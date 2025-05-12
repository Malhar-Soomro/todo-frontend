import { useEffect, useState } from "react";

export const useUploadApi = () => {
    const [data, setData] = useState<Record<string, any>>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>();

    const makeRequest = async (fn: () => Promise<Record<string, any>>) => {
        try {
            setIsLoading(true);
            const d = await fn();
            setData(d.data);
            setIsLoading(false);
            return d.data;

        } catch (error) {
            setIsLoading(false);
            setError(error);
            throw error;
        }
    }

    return { data, isLoading, error, makeRequest };

}

export const useGetApi = (fn: () => Promise<Record<string, any>>) => {
    const [data, setData] = useState<Record<string, any>>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>();

    const makeRequest = async () => {
        try {
            setIsLoading(true);
            const d = await fn();
            setData(d.data);
            setIsLoading(false);
            return d.data;

        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setError(error);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fn().then((d) => setData(d.data)).catch((error) => setError(error)).finally(() => { setIsLoading(false); });

    }, []);

    return { data, isLoading, error, makeRequest };

}