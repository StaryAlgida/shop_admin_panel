import FormState from "../../interfaces/formInterface.ts";

const checkData = (formData: FormState): boolean => {
    for (const key in formData) {
        if (!formData[key].correct) {
            return false
        }
    }
    return true
}

export default checkData