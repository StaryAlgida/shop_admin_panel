import {useContext, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Product} from "../interfaces/prductInterface.ts";
import {useToaster} from "./useToaster.tsx";
import {PaginationContext} from "../context/PaginationContext.tsx";


export default function useGetAllData(): [Product[], boolean, boolean] {
    const defaultData = useMemo<Product[]>(() => ([
            {
                id: '0',
                title: 'No data',
                price: 'No data',
                description: 'No data',
                seller: 'No data',
                image: 'No data',
                sellerPhone: 'No data',
                canNegotiate: false,
                createdOn: 'No data',
                categoryId: 'No data',
            }]
    ), [])
    const [data, setData] = useState<Product[]>([...defaultData])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const {show} = useToaster()
    const {currentPage, categoryId, update} = useContext(PaginationContext)

    useEffect(() => {
        const allOffers = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/adverts?_page=${currentPage}&categoryId=${categoryId}`)
                if (response.data.data.length === 0) {
                    show({title: "No data", description: "Can't find data", bg: "danger"})
                } else {
                    setData([...response.data.data])
                    update(response.data)
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setData([...defaultData])
                    show({title: error.code, description: error.message, bg: "danger"})
                    setError(true)
                }
            } finally {
                setLoading(false)
            }
        }
        void allOffers()
    }, [show, currentPage, categoryId, defaultData, update]);

    return [data, loading, error]
}