import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {FC} from "react";
import {DashboardChartProps} from "../../interfaces/dashboardPropsInterfaces.ts";

const DashboardChart: FC<DashboardChartProps> = ({data, categories}) => {
    const prepareData = () => {
        const items = [...data]
        const categoryIdToTitleMap: Record<string, string> = {};
        categories.forEach(category => {
            categoryIdToTitleMap[category.id] = category.title;
        });

        items.map(item => {
            const findCategory = categories.find((category) => {
                if (item.categoryId === category.id) {
                    return category
                }
            })
            if (findCategory?.title) {
                return item.categoryId = findCategory.title
            } else {
                return item
            }
        })
        return items
    }
    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prepareData()}>
                    <Tooltip/>
                    <Bar dataKey="count" fill="#8884d8"/>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                    <XAxis dataKey="categoryId"/>
                    <YAxis/>
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default DashboardChart;