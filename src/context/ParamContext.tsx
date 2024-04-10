import {createContext, FC, ReactNode} from "react";
import {useSearchParams} from "react-router-dom";

interface ParamContextData {
  setCategory: (value: string) => void;
  setPage: (value: string) => void;
  category: string;
  page: string;
}

const DEFAULT_PAGE = '1'
const DEFAULT_CATEGORY = ''

export const ParamContext = createContext<ParamContextData>({
  setCategory: () => undefined,
  setPage: () => undefined,
  category: DEFAULT_CATEGORY,
  page: DEFAULT_PAGE
})


export const AdvertTableParamProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [searchParam, setSearchParam] = useSearchParams({page: DEFAULT_PAGE, category: DEFAULT_CATEGORY})

  const category = searchParam.get('category') || DEFAULT_CATEGORY;
  const page = searchParam.get('page') || DEFAULT_PAGE

  const setCategory = (value: string) => {
    setSearchParam(prev => {
      const result = new URLSearchParams(prev)
      result.set('category', value)
      result.set('page', DEFAULT_PAGE)
      return result;
    })
  }

  const setPage = (value: string) => {
    setSearchParam(prev => {
      const result = new URLSearchParams(prev)
      result.set('page', value)
      return result
    })
  }

  const contextData: ParamContextData = {
    category,
    page,
    setCategory,
    setPage,
  }

  return (
      <ParamContext.Provider value={contextData}>
        {children}
      </ParamContext.Provider>
  )
}
