import {createContext, ReactNode, useContext, useState} from "react";
import {ParamContext} from "./ParamContext.tsx";

interface PaginationContextData {
    getPagesCount: (advertCount: number, maxAdvertsOnPage: number) => void;
    pagesCount: number;
    changePageByOne: (isNext: boolean) => void;
    currentPage: number;
}

export const PaginationContext = createContext<PaginationContextData>({
    getPagesCount: () => undefined,
    pagesCount: 1,
    changePageByOne: () => undefined,
    currentPage: 0
})

export const PaginationProvider = ({children}: { children: ReactNode }) => {
    const [pagesCount, setPagesCount] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const {getParam, updateParams} = useContext(ParamContext)
    const getPagesCount = (advertCount: number, maxAdvertsOnPage: number) => {
        setPagesCount(Math.ceil(advertCount / maxAdvertsOnPage))
    }

    // TODO: FIX BUG WITH PAGINATION
    const changePageByOne = (isNext: boolean) => {
        const page = getParam("page")
        if (isNext) {
            console.log(page)
            if (page === null || page === "1") {
                updateParams("page", "2")
                console.log(isNext)
            } else if (parseInt(page) + 1 > pagesCount) {
                updateParams("page", `${parseInt(page) + 1}`)
            }

        } else {
            if (page && parseInt(page) - 1 < 1) {
                updateParams("page", `${parseInt(page) - 1}`)
            }
        }
    }
    const contextData = {
        getPagesCount,
        pagesCount,
        changePageByOne,
        currentPage,
    }
    return (
        <PaginationContext.Provider value={contextData}>
            {children}
        </PaginationContext.Provider>
    )
}