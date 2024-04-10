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
import {Spinner} from "react-bootstrap";

interface Category{
  id: string,
  title: string
}
interface CategoryCountResponse {
  id: string;
  categoryId: string;
  count: number;
}
interface DashboardChartProps {
  data: CategoryCountResponse[] | undefined,
  categories: Category[],
  isLoading: boolean
}

const DashboardChart: FC<DashboardChartProps> = ({data, categories, isLoading}) => {

  const findCategory = (item: CategoryCountResponse | undefined) => {
    return categories.find(category => item?.categoryId === category.id)
  }
  const prepareData = () => {
    if (!data) {
      return data
    }

    const items = [...data]
    items?.forEach(item => {
      const category = findCategory(item)
      if (category?.title) {
        item.categoryId = category.title
      }
    })
    return items
  }

  return (
      <>
        {isLoading ? <Spinner animation="border"/> :
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prepareData()}>
                <Tooltip/>
                <Bar dataKey="count" fill="#8884d8"/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                <XAxis dataKey="categoryId"/>
                <YAxis/>
              </BarChart>
            </ResponsiveContainer>
        }
      </>
  )
}

export default DashboardChart;