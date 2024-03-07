interface FormState {
    title: {
        value: string;
        correct: boolean;
        message: string;
    };
    price: {
        value: string;
        correct: boolean;
        message: string;
    };
    description: {
        value: string;
        correct: boolean;
        message: string;
    };
    image: {
        value: string;
        correct: boolean;
        message: string;
    };
    sellerPhone: {
        value: string;
        correct: boolean;
        message: string;
    };
    canNegotiate: {
        value: string;
        correct: boolean;
        message: string;
    };
    categoryId: {
        value: string;
        correct: boolean;
        message: string;
    };
    id: {
        value: string;
        correct: boolean;
        message: string;
    };
    seller: {
        value: string;
        correct: boolean;
        message: string;
    };
    createdOn: {
        value: string;
        correct: boolean;
        message: string;
    };

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