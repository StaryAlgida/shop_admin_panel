interface FormState {
    title: {
        value: string;
        correct: null | boolean;
    };
    price: {
        value: string;
        correct: null | boolean;
    };
    description: {
        value: string;
        correct: null | boolean;
    };
    image: {
        value: string;
        correct: null | boolean;
    };
    sellerPhone: {
        value: string;
        correct: null | boolean;
    };
    canNegotiate: {
        value: string;
        correct: null | boolean;
    };
    categoryId: {
        value: string;
        correct: null | boolean;
    };
    id: {
        value: string;
        correct: null | boolean;
    };
    seller: {
        value: string;
        correct: null | boolean;
    };
    createdOn: {
        value: string;
        correct: null | boolean;
    };

    [key: string]: {
        value: string;
        correct: null | boolean;
    };
}

export const defaultData: FormState = {
    title: {
        value: '',
        correct: null,
    },
    price: {
        value: '',
        correct: null,
    },
    description: {
        value: '',
        correct: null,
    },
    image: {
        value: '',
        correct: null,
    },
    sellerPhone: {
        value: '',
        correct: null,
    },
    canNegotiate: {
        value: '',
        correct: null,
    },
    categoryId: {
        value: '',
        correct: null,
    },
    id: {
        value: '',
        correct: null,
    },
    seller: {
        value: '',
        correct: null,
    },
    createdOn: {
        value: '',
        correct: null,
    },
}
export default FormState