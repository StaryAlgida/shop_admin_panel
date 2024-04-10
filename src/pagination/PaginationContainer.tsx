import {Pagination} from "react-bootstrap";
import PaginationNumbers from "./PaginationNumbers.tsx";
import {useAdvertTableContext} from "../hooks/useAdvertTableContext.tsx";
import useAdvertsTablePagination from "../hooks/useAdvertsTablePagination.tsx";

const MAX_ADVERTS_ON_PAGE = 10

export default function PaginationContainer({totalCount}:{totalCount:number}) {
  const getPagesCount = (advertsCount: number, maxAdvertsOnPage: number) => {
    return Math.ceil(advertsCount / maxAdvertsOnPage)
  }

  const pagesCount = getPagesCount(totalCount, MAX_ADVERTS_ON_PAGE)

  const {pageNext, pagePrev} = useAdvertsTablePagination(pagesCount)
  const {setPage} = useAdvertTableContext()

  return (
      <Pagination>
        <Pagination.First onClick={() => {
          setPage("1")
        }}/>

        <Pagination.Prev onClick={pagePrev}/>
        <PaginationNumbers pagesCount={pagesCount}/>
        <Pagination.Next onClick={pageNext}/>

        <Pagination.Last onClick={() => {
          setPage(`${pagesCount}`)
        }}/>
      </Pagination>
  );
}