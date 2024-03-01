import {useEffect, useState} from "react";
import axios from "axios";
import Product from "../interfaces/prductInterface.ts";
import {useToaster} from "./useToaster.tsx";


export default function useGetAllData(): [Product[], boolean] {
    const [data, setData] = useState<Product[]>([{
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
    }])
    const [loading, setLoading] = useState<boolean>(false)
    const {show} = useToaster()

    useEffect(() => {
        const allOffers = async () => {
            try {
                setLoading(true)
                const response = await axios.get('/adverts')
                setData([...response.data])
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    show({title: error.code, description: error.message, bg: "danger"})
                    console.log(error)
                }
            } finally {
                setLoading(false)
            }
        }
        void allOffers()
    }, [show]);

    return [data, loading]
}