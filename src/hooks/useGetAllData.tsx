import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Product} from "../interfaces/prductInterface.ts";
import {useToaster} from "./useToaster.tsx";
// import {PaginationContext} from "../context/PaginationContext.tsx";
import {ParamContext} from "../context/ParamContext.tsx";
import {PaginationContext} from "../context/PaginationContext.tsx";


export default function useGetAllData(): [Product[] | undefined, boolean, boolean] {
    const [data, setData] = useState<Product[] | undefined>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const {show} = useToaster()
    const {getParam} = useContext(ParamContext)
    const {getPagesCount} = useContext(PaginationContext)
    useEffect(() => {
        const allOffers = async () => {
            try {
                const page = getParam('page')
                const categoryId = getParam('category')
                // console.log(`${page} ${categoryId}`)
                setLoading(true)
                const response = await axios.get(`/adverts?_page=${page || 1}&categoryId=${categoryId || ''}`)
                getPagesCount(response.data.items, 10)
                if (response.data.data.length === 0) {
                    show({title: "No data", description: "Can't find data", bg: "danger"})
                } else {
                    setData([...response.data.data])
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    show({title: error.code, description: error.message, bg: "danger"})
                    setError(true)
                }
            } finally {
                setLoading(false)
            }
        }
        void allOffers()
    }, [show, getParam, getPagesCount]);

    return [data, loading, error]
}