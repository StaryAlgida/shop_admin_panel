import {useEffect, useState} from "react";
import {Product} from "../interfaces/prductInterface.ts";
import axios from "axios";
import {useToaster} from "./useToaster.tsx";

export default function useSingleAdvert(advertId: string | undefined) {
    const {show} = useToaster()
    const [singleAdvertData, setSingleAdvertData] = useState<Product>()
    const [isAdvertLoading, setIsAdvertLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                setIsAdvertLoading(true)
                const response = await axios.get(`/adverts?id=${advertId}`)
                if (response.data.length > 0) {
                    setSingleAdvertData({...response.data[0]})
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    show({title: error.code, description: error.message, bg: "danger"})
                }
            } finally {
                setIsAdvertLoading(false)
            }
        }
        void getData()
    }, [advertId, show]);
    return {singleAdvertData, isAdvertLoading}
}