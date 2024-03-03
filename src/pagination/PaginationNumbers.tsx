import {useContext, useEffect, useState} from "react";
import {Pagination} from "react-bootstrap";
import {PaginationContext} from "../context/PaginationContext.tsx";

export default function PaginationNumbers({currentPage, maxPage}: { currentPage: number, maxPage: number }) {

    const [pages, setPages] = useState<number[]>([])
    const {updateCurrentPage} = useContext(PaginationContext)

    useEffect(() => {
        setPages([...Array(maxPage).keys()].map(x => x + 1))
    }, [maxPage]);

    return (
        <>
            {pages.map(page => {
                if (currentPage === page) {
                    return (
                        <Pagination.Item onClick={() => updateCurrentPage(page)} active key={page}>{page}</Pagination.Item>
                    )
                } else {
                    return (
                        <Pagination.Item onClick={() => updateCurrentPage(page)} key={page}>{page}</Pagination.Item>
                    )
                }

            })}
        </>
    )
}