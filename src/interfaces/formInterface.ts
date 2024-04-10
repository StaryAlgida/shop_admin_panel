interface FieldData {
  touched: boolean;
  correct: boolean;
  message: string;
}

interface FormValue {
  title: string;
  price: string;
  description: string;
  seller: string;
  image: string;
  sellerPhone: string;
  canNegotiate: string;
  createdOn: string;
  categoryId: string;

  [key: string]: string;
}

interface FormState {
  title: FieldData;
  price: FieldData;
  description: FieldData;
  seller: FieldData;
  image: FieldData;
  sellerPhone: FieldData;
  canNegotiate: FieldData;
  createdOn: FieldData;
  categoryId: FieldData;

  [key: string]: FieldData;
}

interface FormTouched {
  title: boolean;
  price: boolean;
  description: boolean;
  seller: boolean;
  image: boolean;
  sellerPhone: boolean;
  canNegotiate: boolean;
  createdOn: boolean;
  categoryId: boolean;

  [key: string]: boolean;
}

interface FormError {
  title: string | null;
  price: string | null;
  description: string | null;
  seller: string | null;
  image: string | null;
  sellerPhone: string | null;
  canNegotiate: string | null;
  createdOn: string | null;
  categoryId: string | null;

  [key: string]: string | null;
}

export const initFormTouched = {
  title: false,
  price: false,
  description: false,
  seller: false,
  image: false,
  sellerPhone: false,
  canNegotiate: false,
  createdOn: false,
  categoryId: false,
}

export const initFormError = {
  title: null,
  price: null,
  description: null,
  seller: null,
  image: null,
  sellerPhone: null,
  canNegotiate: null,
  createdOn: null,
  categoryId: null,
}

export const initFormErrorBad = {
  title: "This field is required",
  price: "This field is required",
  description: "This field is required",
  seller: "This field is required",
  image: "This field is required",
  sellerPhone: "This field is required",
  canNegotiate: "This field is required",
  createdOn: "This field is required",
  categoryId: "This field is required",
}


export const defaultData: FormValue = {
  title: '',
  price: '',
  description: '',
  image: '',
  sellerPhone: '',
  canNegotiate: '',
  categoryId: '',
  id: '',
  seller: '',
  createdOn: '',
}
export type{FormState, FormValue, FormTouched, FormError}