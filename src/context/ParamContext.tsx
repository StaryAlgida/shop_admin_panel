import {createContext, FC, ReactNode} from "react";
import {useSearchParams} from "react-router-dom";

interface ParamContextData {
    updateCategory: (value: string) => void;
    updatePage: (value: string) => void;
    getCategory: () => string;
    getPage: () => string;
}

export const ParamContext = createContext<ParamContextData>({
    updateCategory: () => undefined,
    updatePage: () => undefined,
    getCategory: () => '',
    getPage: () => ''
})

export const ParamProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [categoryParam, setCategoryParam] = useSearchParams({page: '1', category: ''})
    const [pageParam, setPageParam] = useSearchParams({page: '1'})

    const updateCategory = (value: string) => {
        setCategoryParam(prev => {
            prev.set('category', value)
            return prev
        })
    }
    const getCategory = () => {
        return categoryParam.get('category') || ''
    }

    const updatePage = (value: string) => {
        setPageParam(prev => {
            prev.set('page', value)
            return prev
        })
    }
    const getPage = () => {
        return pageParam.get('page') || ''
    }

    const contextData: ParamContextData = {
        updateCategory,
        getCategory,
        updatePage,
        getPage
    }

    return (
        <ParamContext.Provider value={contextData}>
            {children}
        </ParamContext.Provider>
    )
}