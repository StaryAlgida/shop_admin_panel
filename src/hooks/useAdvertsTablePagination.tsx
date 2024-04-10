import {useContext} from "react";
import {ParamContext} from "../context/ParamContext.tsx";

export default function useAdvertsTablePagination(pagesCount: number = 0) {
  const {page, setPage} = useContext(ParamContext)

  const pageNext = () => {
    const currentPage = parseInt(page)
    if (currentPage + 1 <= pagesCount) {
      setPage(`${currentPage + 1}`)
    }
  }

  const pagePrev = () => {
    const currentPage = parseInt(page)
    if (currentPage - 1 >= 1) {
      setPage(`${currentPage - 1}`)
    }
  }

  return {pageNext, pagePrev}
}