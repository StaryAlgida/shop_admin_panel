import {Pagination} from "react-bootstrap";
import {useContext} from "react";
import {PaginationContext} from "../context/PaginationContext.tsx";
import PaginationNumbers from "./PaginationNumbers.tsx";
import {ParamContext} from "../context/ParamContext.tsx";

export default function PaginationContainer() {
    const {pagesCount, pageNext, pagePrev} = useContext(PaginationContext)
    const {updatePage} = useContext(ParamContext)
    return (
        <Pagination>
            <Pagination.First onClick={() => {
                updatePage("1")
            }}/>

            <Pagination.Prev onClick={pagePrev}/>
            <PaginationNumbers/>
            <Pagination.Next onClick={pageNext}/>

            <Pagination.Last onClick={() => {
                updatePage(`${pagesCount}`)
            }}/>
        </Pagination>
    );
}