import {Spinner, Table} from "react-bootstrap";
import {FC} from "react";
import {Product} from "../../interfaces/prductInterface.ts";
import {LinkContainer} from "react-router-bootstrap";

interface Category{
  id: string,
  title: string
}
interface DashboardTableProps {
  data: Product[] | undefined,
  categories: Category[],
  isLoading: boolean
}

const DashboardTable: FC<DashboardTableProps> = ({data, categories, isLoading}) => {
  const selectCategory = (item: Product): string => {
    const selectedCategory = categories.find((category) => category.id === item.categoryId)
    if (selectedCategory) {
      return selectedCategory.title
    } else {
      return item.categoryId
    }
  }
  return (
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>id</th>
          <th>User</th>
          <th>Title</th>
          <th>Price $</th>
          <th>Category</th>
        </tr>
        </thead>
        <tbody>
        {isLoading &&
            <tr>
                <td colSpan={5} className='text-center cursor-not-allowed'>
                    <Spinner animation="border"/>
                </td>
            </tr>
        }
        {!data && !isLoading &&
            <tr>
                <td colSpan={5} className='text-center cursor-not-allowed'>No data</td>
            </tr>
        }
        {data?.map((item) => (
            <LinkContainer key={item.id} to={`/adverts/${item.id}`}>
              <tr className="cursor-pointer">
                <td>{item.id}</td>
                <td>{item.seller}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{selectCategory(item)}</td>
              </tr>
            </LinkContainer>
        ))}
        </tbody>
      </Table>
  )
}

export default DashboardTable