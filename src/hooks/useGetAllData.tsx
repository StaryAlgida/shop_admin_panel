import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Product} from "../interfaces/prductInterface.ts";
import {useToaster} from "./useToaster.tsx";
import {ParamContext} from "../context/ParamContext.tsx";

interface AdvertsResponse {
  data: Product[];
  items: number;
}

export default function useGetAllData() {
  const [data, setData] = useState<Product[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const {show} = useToaster()
  const {page, category} = useContext(ParamContext)

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true)
        const {data} = await axios.get<AdvertsResponse>(`/adverts`, {params: {_page: page, categoryId: category}})
        setTotalCount(data.items);
        setData(data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          show({title: error.code, description: error.message, bg: "danger"})
        }
      } finally {
        setLoading(false)
      }
    }
    void fetchOffers()
  }, [show, page, category]);

  return {data, loading, totalCount}
  // return [data, loading, error] as const
}

// fetch => model => view