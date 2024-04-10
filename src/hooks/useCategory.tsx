import {useEffect, useState} from "react";
import axios from "axios";
import {useToaster} from "./useToaster.tsx";

interface Category{
  id: string,
  title: string
}

export default function useCategory() {
  const {show} = useToaster()
  const [categoryData, setCategoryData] = useState<Category[]>([])
  const [categoryLoading, setCategoryLoading] = useState<boolean>(false)
  useEffect(() => {
    const getCategories = async () => {
      try {
        setCategoryLoading(true)
        const response = await axios.get('/categories')
        setCategoryData([...response.data])
      } catch (error) {
        if (axios.isAxiosError(error)) {
          show({title: error.code, description: error.message, bg: "danger"})
        }
      } finally {
        setCategoryLoading(false)
      }
    }
    void getCategories()
  }, [show]);

  return {categoryData, categoryLoading}
}