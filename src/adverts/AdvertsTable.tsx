import useGetAllData from "../hooks/useGetAllData.tsx";
import AdvertsTableItem from "./AdvertsTableItem.tsx";
import {Table} from "react-bootstrap";
import useCategory from "../hooks/useCategory.tsx";
import AdvertsLoadingError from "./advertsTableLoadingError/AdvertsLoadingError.tsx";
import PaginationContainer from "../pagination/PaginationContainer.tsx";

export default function AdvertsTable() {
  const {data, totalCount, loading} = useGetAllData()
  const {categoryData} = useCategory()
  return (
      <>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>id</th>
            <th>User</th>
            <th>Title</th>
            <th>Price $</th>
            <th>Created on</th>
            <th>Category</th>
          </tr>
          </thead>
          <tbody>
          <AdvertsLoadingError isLoading={loading} isError={!totalCount}/>
          {data?.map(item => (
              (<AdvertsTableItem key={item.id} data={item} categories={categoryData}/>)
          ))}
          </tbody>
        </Table>
        <PaginationContainer totalCount={totalCount} />
      </>
  )
}