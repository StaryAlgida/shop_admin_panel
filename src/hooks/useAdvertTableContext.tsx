import {useContext} from "react";
import {ParamContext} from "../context/ParamContext.tsx";

export const useAdvertTableContext = () => useContext(ParamContext);