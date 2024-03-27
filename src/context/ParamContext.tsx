import {createContext, FC, ReactNode} from "react";
import {useSearchParams} from "react-router-dom";

interface ParamContextData {
    updateParams: (param: string, value: string) => void;
    getParam: (value: string) => string | null;
}

export const ParamContext = createContext<ParamContextData>({
    updateParams: () => undefined,
    getParam: () => null,
})

export const ParamProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [param, setParams] = useSearchParams({category: '', page: '1'})

    const updateParams = (param: string, value: string) => {
        setParams(prev => {
            prev.set(param, value)
            return prev
        })
    }

    const getParam = (value: string) => {
        return param.get(value)
    }

    const contextData: ParamContextData = {
        updateParams,
        getParam
    }

    return (
        <ParamContext.Provider value={contextData}>
            {children}
        </ParamContext.Provider>
    )
}