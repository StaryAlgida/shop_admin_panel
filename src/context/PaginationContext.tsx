import {createContext, ReactNode, useCallback, useState} from "react";
import {Pagination} from "../interfaces/prductInterface.ts";

interface PageInfo {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
}

interface PaginationContextData {
    update: (data: Pagination) => void;
    updateCurrentPage: (pageNumber: number) => void;
    updateCategory: (id: string) => void;
    pagesInfo: PageInfo;
    currentPage: number;
    categoryId: string;
}

export const PaginationContext = createContext<PaginationContextData>({
    update: () => {
    },
    updateCurrentPage: () => {
    },
    updateCategory: () => {
    },
    pagesInfo: {
        first: 0,
        prev: null,
        next: null,
        last: 0,
        pages: 0,
    },
    currentPage: 1,
    categoryId: '',
})

export const PaginationProvider = ({children}: { children: ReactNode }) => {
    const [pagesInfo, setPagesInfo] = useState<PageInfo>({
        first: 0,
        prev: null,
        next: null,
        last: 0,
        pages: 0,
    })
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [categoryId, setCategoryId] = useState<string>('')
    const update = useCallback((data: Pagination) => {
        setPagesInfo({
            first: data.first,
            prev: data.prev,
            next: data.next,
            last: data.last,
            pages: data.pages,
        })
    }, [])

    const updateCurrentPage = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const updateCategory = useCallback((id: string) => {
        setCategoryId(id)
    }, [])

    const contextData = {
        update,
        updateCurrentPage,
        updateCategory,
        pagesInfo,
        currentPage,
        categoryId,
    }
    return (
        <PaginationContext.Provider value={contextData}>
            {children}
        </PaginationContext.Provider>
    )
}