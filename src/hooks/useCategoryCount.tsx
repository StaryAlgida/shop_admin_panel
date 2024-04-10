import {useEffect, useState} from "react";
import {useToaster} from "./useToaster.tsx";
import axios from "axios";

interface CategoryCountResponse {
  id: string;
  categoryId: string;
  count: number;
}

export default function useCategoryCount() {
  const [categoryCountData, setCategoryCountData] = useState<CategoryCountResponse[]>()
  const [isCategoryCountLoading, setIsCategoryCountLoading] = useState<boolean>(false)
  const {show} = useToaster()

  useEffect(() => {
    const countCategories = async () => {
      try {
        setIsCategoryCountLoading(true)
        const {data} = await axios.get<CategoryCountResponse[]>('/stats')
        setCategoryCountData(data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          show({title: error.code, description: error.message, bg: "danger"})
        }
      } finally {
        setIsCategoryCountLoading(false)
      }
    }
    void countCategories()
  }, [show]);

  return {categoryCountData, isCategoryCountLoading}
}