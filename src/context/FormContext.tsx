import {ChangeEvent, createContext, FC, ReactNode, useCallback, useState} from "react";
import {
  defaultData,
  FormError,
  FormTouched,
  FormValue, initFormError,
  initFormTouched
} from "../interfaces/formInterface.ts";
import axios from "axios";
import {useToaster} from "../hooks/useToaster.tsx";
import formValidation from "../forms/validations/formValidation.ts";

interface FormContextData {
  values: FormValue;
  touched: FormTouched;
  error: FormError;
  handleSubmit: (url: string, data: FormValue, method: string) => void;
  handleChange: (event: never) => void;
  updateError: (key: string, message: string) => void;
  iniValues: (data: FormValue) => void;
}

export const FormValuesContext = createContext<FormContextData>({
  values: {...defaultData},
  touched: {...initFormTouched},
  error: {...initFormError},
  handleSubmit: () => undefined,
  handleChange: () => undefined,
  updateError: () => undefined,
  iniValues: () => undefined,
})

export const FormProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [values, setValues] = useState<FormValue>({...defaultData})
  const [touched, setTouched] = useState<FormTouched>({...initFormTouched})
  const [error, setError] = useState<FormError>({...initFormError})
  const {show} = useToaster()

  const handleSubmit = async (url: string, data: FormValue, method: string = "post") => {
    try {

      data.createdOn = new Date().toISOString()
      delete data.id
      const response = await axios({method, url, data})
      show({title: `Success status: ${response.status}`, description: "Operation was successful", bg: "success"})
    } catch (error) {
      if (axios.isAxiosError(error)) {
        show({title: error.code, description: error.message, bg: "danger"})
      }
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name
    const value = event.target.value

    setValues(prevState => ({
      ...prevState,
      [name]: value
    }))

    if (!touched[name]) {
      setTouched(prevState => ({
        ...prevState,
        [name]: true,
      }))
    }

    const status = formValidation(value, name)

    setError(prevState => ({
      ...prevState,
      [name]: status
    }))
  }

  const updateError = (key: string, message: string) => {
    const setMessage = message === '' ? null : message
    setError(prevState => ({
      ...prevState,
      [key]: setMessage,
    }))
  }

  const iniValues = useCallback((data: FormValue) => {
    setValues({...data})
  }, []);


  const contextData: FormContextData = {
    values,
    touched,
    error,
    handleSubmit,
    handleChange,
    updateError,
    iniValues,
  }

  return (
      <FormValuesContext.Provider value={contextData}>
        {children}
      </FormValuesContext.Provider>
  )
}

