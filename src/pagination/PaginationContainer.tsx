import {Pagination} from "react-bootstrap";
import {useContext} from "react";
import {PaginationContext} from "../context/PaginationContext.tsx";
import PaginationNumbers from "./PaginationNumbers.tsx";

export default function PaginationContainer() {
    const {pagesInfo, currentPage, updateCurrentPage} = useContext(PaginationContext)
    return (
        <Pagination>
            <Pagination.First onClick={() => {
                updateCurrentPage(1)
            }}/>
            <Pagination.Prev onClick={() => {
                updateCurrentPage(pagesInfo.prev === null ? pagesInfo.first : pagesInfo.prev)
            }}/>
            <PaginationNumbers currentPage={currentPage} maxPage={pagesInfo.pages}/>
            {/*<Pagination.Item>{1}</Pagination.Item>*/}
            {/*<Pagination.Ellipsis/>*/}
            {/*<Pagination.Item>{10}</Pagination.Item>*/}
            {/*<Pagination.Item>{11}</Pagination.Item>*/}
            {/*<Pagination.Item active>{12}</Pagination.Item>*/}
            {/*<Pagination.Item>{13}</Pagination.Item>*/}
            {/*<Pagination.Item disabled>{14}</Pagination.Item>*/}
            {/*<Pagination.Ellipsis/>*/}
            {/*<Pagination.Item>{20}</Pagination.Item>*/}

            <Pagination.Next onClick={() => {
                updateCurrentPage(pagesInfo.next === null ? pagesInfo.last : pagesInfo.next)
            }}/>
            <Pagination.Last onClick={() => {
                updateCurrentPage(pagesInfo.last)
            }}/>
        </Pagination>
    );
}