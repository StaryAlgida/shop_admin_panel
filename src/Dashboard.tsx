import {Col, Row} from "react-bootstrap";
import DashboardTable from "./dashboardComponents/DashboardTable.tsx";
import DashboardChart from "./dashboardComponents/DashboardChart.tsx";
import useCategoryCount from "./hooks/useCategoryCount.tsx";
import useCategory from "./hooks/useCategory.tsx";
import useDashboardTableData from "./hooks/useDashboardTableData.tsx";
import DashboardLoading from "./skeletons/DashboardLoading.tsx";

export default function Dashboard() {
    const [data, isChartLoading, isChartError] = useCategoryCount()
    const [categoriesDada, isCategoriesLoading, isCategoriesError] = useCategory()
    const [tableData, isTableLoading, isTableError] = useDashboardTableData()
    return (
        <Row>
            {isChartLoading || isCategoriesLoading || isTableLoading ? <DashboardLoading/> :
                isChartError || isCategoriesError || isTableError ? "Error" :
                    <>
                        <Col xs={12} lg={6}><DashboardTable data={tableData} categories={categoriesDada}/></Col>
                        <Col xs={12} lg={6}><DashboardChart data={data} categories={categoriesDada}/></Col>
                    </>
            }
        </Row>
    )
}