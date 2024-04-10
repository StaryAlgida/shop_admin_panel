import {Col, Row} from "react-bootstrap";
import DashboardTable from "./components/DashboardTable.tsx";
import DashboardChart from "./components/DashboardChart.tsx";
import useCategoryCount from "../hooks/useCategoryCount.tsx";
import useCategory from "../hooks/useCategory.tsx";
import useDashboardTableData from "../hooks/useDashboardTableData.tsx";

export default function Dashboard() {
  const {categoryCountData, isCategoryCountLoading} = useCategoryCount()
  const {categoryData} = useCategory()
  const {advertsData, isAdvertsLoading} = useDashboardTableData()
  return (

      <Row>
        <Col xs={12} lg={6}>
          <DashboardTable data={advertsData} categories={categoryData} isLoading={isAdvertsLoading}/>
        </Col>
        <Col xs={12} lg={6} className="text-center">
          <DashboardChart data={categoryCountData} categories={categoryData} isLoading={isCategoryCountLoading}/>
        </Col>
      </Row>
  )
}