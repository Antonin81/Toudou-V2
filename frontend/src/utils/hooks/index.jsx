import { useEffect, useState } from "react";

export function useFetch(url) {
    
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    async function fetchData(){
        setIsLoading(true)
        try {
            const response = await fetch(`${url}`)
            setData(await response.json())
        }catch(err){
            console.log(err)
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        if(!url)return
        setIsLoading(true)
        fetchData()
    },[url])

    return { data, isLoading, error}
    
}