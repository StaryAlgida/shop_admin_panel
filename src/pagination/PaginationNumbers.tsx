import {useContext, useEffect, useState} from "react";
import {Pagination} from "react-bootstrap";
import {ParamContext} from "../context/ParamContext.tsx";

export default function PaginationNumbers({pagesCount}: { pagesCount: number }) {

  const [pages, setPages] = useState<number[]>([])
  const {page, setPage} = useContext(ParamContext)

  useEffect(() => {
    setPages([...Array(pagesCount).keys()].map(x => x + 1))
  }, [pagesCount]);

  const checkPageActive = (pageNumber: number): boolean => {
    return parseInt(page) === pageNumber;
  }

  return (
      <>
        {pages.map(page => {
          if (checkPageActive(page)) {
            return (
                <Pagination.Item
                    active
                    key={page}
                >
                  {page}
                </Pagination.Item>
            )
          } else {
            return (
                <Pagination.Item
                    onClick={() => setPage(`${page}`)}
                    key={page}
                >
                  {page}
                </Pagination.Item>
            )
          }

        })}
      </>
  )
}