import {useContext, useEffect, useState} from "react";
import {Pagination} from "react-bootstrap";
import {PaginationContext} from "../context/PaginationContext.tsx";
import {ParamContext} from "../context/ParamContext.tsx";

export default function PaginationNumbers() {

    const [pages, setPages] = useState<number[]>([])
    const {pagesCount} = useContext(PaginationContext)
    const {getPage, updatePage} = useContext(ParamContext)

    useEffect(() => {
        setPages([...Array(pagesCount).keys()].map(x => x + 1))
    }, [pagesCount]);

    const checkPages = (page: number): boolean => {
        const currentPage = getPage()
        if (currentPage === null || currentPage === '' && page === 1) {
            return true
        }
        if (page === pagesCount && parseInt(currentPage) > pagesCount) {
            return true
        }
        return parseInt(currentPage) === page;

    }

    return (
        <>
            {pages.map(page => {
                if (checkPages(page)) {
                    return (
                        <Pagination.Item
                            onClick={() => console.log(page)} active
                            key={page}
                        >
                            {page}
                        </Pagination.Item>
                    )
                } else {
                    return (
                        <Pagination.Item
                            onClick={() => updatePage(`${page}`)}
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