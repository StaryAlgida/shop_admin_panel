import CategoryCount from "./categoryCountInterface.ts";
import Category from "./categoryInterface.ts";
import {Product} from "./prductInterface.ts";

interface DashboardChartProps{
    data : CategoryCount[],
    categories: Category[]
}

interface DashboardTableProps{
    data: Product[],
    categories: Category[]
}

interface StatesProps{
    isLoading?: boolean,
    isError?: boolean,
}

export type {DashboardChartProps, DashboardTableProps, StatesProps}