import {Col, Row} from "react-bootstrap";
import DashboardsAdverts from "./dashboardComponents/DashboardsAdverts.tsx";
import DashboardChart from "./dashboardComponents/DashboardChart.tsx";
import useCategoryCount from "./hooks/useCategoryCount.tsx";
import useCategory from "./hooks/useCategory.tsx";

export default function Dashboard() {
    const [data, isChartLoading, isChartError] = useCategoryCount()
    const [categoriesDada, isCategoriesLoading, isCategoriesError] = useCategory()
    return (
        <Row>
            {isChartLoading && isCategoriesLoading ? "Loading" :
                isChartError && isCategoriesError? "Error":
                <>
                    <Col xs={12} lg={6}><DashboardsAdverts/></Col>
                    <Col xs={12} lg={6}><DashboardChart data={data} categories={categoriesDada}/></Col>
                </>
            }

        </Row>
    )
}