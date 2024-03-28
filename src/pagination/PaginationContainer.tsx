import {Pagination} from "react-bootstrap";
import {useContext} from "react";
import {PaginationContext} from "../context/PaginationContext.tsx";
import PaginationNumbers from "./PaginationNumbers.tsx";
import {ParamContext} from "../context/ParamContext.tsx";

export default function PaginationContainer() {
    const {pagesCount, currentPage, changePageByOne} = useContext(PaginationContext)
    const {updateParams} = useContext(ParamContext)
    return (
        <Pagination>
            <Pagination.First onClick={() => {
                updateParams("page", "1")
            }}/>
            <Pagination.Prev onClick={() => {
                changePageByOne(false)
            }}/>

            {/*<PaginationNumbers currentPage={currentPage} maxPage={pagesInfo.pages}/>*/}

            <Pagination.Next onClick={() => {
                changePageByOne(true)
            }}/>
            <Pagination.Last onClick={() => {
                updateParams("page", `${pagesCount}`)
            }}/>
        </Pagination>
    );
}