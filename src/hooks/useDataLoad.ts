import { useEffect, useState } from "react"

export const useDataLoad = <T>(apiLoader: () => Promise<T>) => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        setIsLoading(true)
        try {

            const response = await apiLoader()
            setData(response)
        } catch (error: any) {
            console.log(error)
            setError(error.response.data.error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {
        data,
        isLoading,
        setData,
        refetch: fetchData,
        error
    }
}