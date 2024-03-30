import {useEffect, useState} from "react";
import {Product} from "../interfaces/prductInterface.ts";
import axios from "axios";
import {useToaster} from "./useToaster.tsx";

export default function useSingleAdvert(advertId: string | undefined):[Product, boolean, boolean] {
    const {show} = useToaster()
    const [data, setData] = useState<Product>({
        id: '',
        title: '',
        price: '0',
        description: '',
        seller: '',
        image: '',
        sellerPhone: '',
        canNegotiate: false,
        createdOn: '',
        categoryId: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/adverts?id=${advertId}`)
                if (response.data.length > 0) {
                    setData({...response.data[0]})
                } else {
                    setError(true)
                    show({title: "404", description: `Advert with id:${advertId} not found.`, bg: "danger"})
                }

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error)
                    show({title: error.code, description: error.message, bg: "danger"})
                    setError(true)
                }
            } finally {
                setLoading(false)
            }
        }
        void getData()
    }, [advertId, show]);
    return [data, loading, error]
}