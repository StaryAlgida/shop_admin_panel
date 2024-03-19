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

export type {DashboardChartProps, DashboardTableProps}