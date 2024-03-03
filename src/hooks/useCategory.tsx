import {useEffect, useState} from "react";
import axios from "axios";
import Category from "../interfaces/categoryInterface.ts";

export default function useCategory():[Category[], boolean, boolean] {
    const [data, setData] = useState<Category[]>([{
        id: '',
        title: ''
    }])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true)
                const response = await axios.get('/categories')
                setData([...response.data])
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(true)
                    console.log('error')
                }
            } finally {
                setLoading(false)
            }
        }
        void getCategories()
    }, []);

    return [data, loading, error]

}