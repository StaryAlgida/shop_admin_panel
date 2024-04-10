import {useEffect, useState} from "react";
import {Product} from "../interfaces/prductInterface.ts";
import axios from "axios";
import {useToaster} from "./useToaster.tsx";

export default function useDashboardTableData() {
  const [advertsData, setAdvertsData] = useState<Product[]>()
  const [isAdvertsLoading, setIsAdvertsLoading] = useState<boolean>(false)
  const {show} = useToaster()
  useEffect(() => {
    const dashboardOffers = async () => {
      try {
        setIsAdvertsLoading(true)
        const {data} = await axios.get<Product[]>(`/adverts?_start=45&_limit=7`)
        setAdvertsData(data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          show({title: error.code, description: error.message, bg: "danger"})
        }
      } finally {
        setIsAdvertsLoading(false)
      }
    }
    void dashboardOffers()
  }, [show]);
  return {advertsData, isAdvertsLoading}
}