interface FieldData{
    value: string;
    correct: boolean;
    message: string;
}

interface FormState {
    title: FieldData;
    price: FieldData;
    description: FieldData;
    image: FieldData;
    sellerPhone: FieldData;
    canNegotiate: FieldData;
    categoryId: FieldData;
    id: FieldData;
    seller: FieldData;
    createdOn: FieldData;

    [key: string]: {
        value: string;
        correct: boolean;
        message: string;
    };
}

export const defaultData: FormState = {
    title: {
        value: '',
        correct: false,
        message: '',
    },
    price: {
        value: '',
        correct: false,
        message: '',
    },
    description: {
        value: '',
        correct: false,
        message: '',
    },
    image: {
        value: '',
        correct: false,
        message: '',
    },
    sellerPhone: {
        value: '',
        correct: false,
        message: '',
    },
    canNegotiate: {
        value: '',
        correct: false,
        message: '',
    },
    categoryId: {
        value: '',
        correct: false,
        message: '',
    },
    id: {
        value: '',
        correct: false,
        message: '',
    },
    seller: {
        value: '',
        correct: false,
        message: '',
    },
    createdOn: {
        value: '',
        correct: false,
        message: '',
    },
}
export default FormState