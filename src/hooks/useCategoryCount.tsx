import {useEffect, useState} from "react";
import {useToaster} from "./useToaster.tsx";
import axios from "axios";
import CategoryCount from "../interfaces/categoryCountInterface.ts";


export default function useCategoryCount(): [CategoryCount[], boolean, boolean] {
    const [data, setData] = useState<CategoryCount[]>([{
        categoryId: "-1",
        count: 0
    }])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const {show} = useToaster()

    useEffect(() => {
        const countCategories = async () => {
            try {
                setLoading(true)
                const response = await axios.get('/stats')
                setData([...response.data])
                setLoading(false)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    show({title: error.code, description: error.message, bg: "danger"})
                    setError(true)
                }
            } finally {
                setLoading(false)
            }
        }
        void countCategories()
    }, []);

    return [data, loading, error]
}