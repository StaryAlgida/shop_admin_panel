interface Pagination {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    data: Product[]
}

interface Product {
    id: string | null;
    title: string | null;
    price: string | null;
    description: string | null;
    seller: string | null;
    image: string | null;
    sellerPhone: string | null;
    canNegotiate: boolean | null;
    createdOn: string | null;
    categoryId: string | null;
    [key: string]: string | boolean | null;
}

export type {Product, Pagination}