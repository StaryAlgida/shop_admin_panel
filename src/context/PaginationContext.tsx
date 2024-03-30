import {createContext, ReactNode, useContext, useState} from "react";
import {ParamContext} from "./ParamContext.tsx";

interface PaginationContextData {
    getPagesCount: (advertCount: number, maxAdvertsOnPage: number) => void;
    pageNext: () => void;
    pagePrev: () => void;
    pagesCount: number;
}

export const PaginationContext = createContext<PaginationContextData>({
    getPagesCount: () => undefined,
    pageNext: () => undefined,
    pagePrev: () => undefined,
    pagesCount: 1,
})

export const PaginationProvider = ({children}: { children: ReactNode }) => {
    const [pagesCount, setPagesCount] = useState<number>(0)
    const {getPage, updatePage} = useContext(ParamContext)

    const getPagesCount = (advertCount: number, maxAdvertsOnPage: number) => {
        setPagesCount(Math.ceil(advertCount / maxAdvertsOnPage))
    }

    const pageNext = () => {
        const currentPage = parseInt(getPage())
        if (currentPage + 1 <= pagesCount) {
            updatePage(`${currentPage + 1}`)
        }
    }

    const pagePrev = () => {
        const currentPage = parseInt(getPage())
        if (currentPage - 1 >= 1) {
            updatePage(`${currentPage - 1}`)
        }
    }

    const contextData = {
        getPagesCount,
        pageNext,
        pagePrev,
        pagesCount,
    }
    return (
        <PaginationContext.Provider value={contextData}>
            {children}
        </PaginationContext.Provider>
    )
}