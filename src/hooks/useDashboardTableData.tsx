import {useEffect, useMemo, useState} from "react";
import {Product} from "../interfaces/prductInterface.ts";
import {useToaster} from "./useToaster.tsx";
import axios from "axios";

export default function useDashboardTableData(): [Product[], boolean, boolean] {
    const defaultData = useMemo<Product[]>(() => ([
            {
                id: "Error",
                title: "Error",
                price: "Error",
                description: "Error",
                seller: "Error",
                image: "Error",
                sellerPhone: "Error",
                canNegotiate: false,
                createdOn: "Error",
                categoryId: "Error",
            }]
    ), [])
    const [data, setData] = useState<Product[]>([...defaultData])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const {show} = useToaster()

    useEffect(() => {
        const dashboardOffers = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/adverts?_start=46&_limit=5`)
                if (response.data.length === 0) {
                    show({title: "No data", description: "Can't find data", bg: "danger"})
                } else {
                    setData([...response.data])
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
        void dashboardOffers()
    }, [defaultData, show]);
    return [data, loading, error]
}