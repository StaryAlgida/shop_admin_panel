interface Pagination {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    data: Product[]
}

interface Product {
    id: string;
    title: string;
    price: string;
    description: string;
    seller: string;
    image: string;
    sellerPhone: string;
    canNegotiate: boolean;
    createdOn: string;
    categoryId: string;

    [key: string]: string | boolean;
}

export type {Product, Pagination}