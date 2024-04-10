import {FormError} from "../../interfaces/formInterface.ts";

const checkIfError = (error: FormError): boolean => {
  for (const key in error) {

    if (error[key] !== null) {
      console.log(key)
      return true
    }
  }
  return false
}

export default checkIfError