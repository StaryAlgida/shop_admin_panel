import CategoryCount from "./categoryCountInterface.ts";
import Category from "./categoryInterface.ts";

interface DashboardChartProps{
    data : CategoryCount[],
    categories: Category[]
}


export type {DashboardChartProps}