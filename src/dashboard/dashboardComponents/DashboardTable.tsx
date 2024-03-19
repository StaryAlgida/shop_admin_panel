import {Table} from "react-bootstrap";
import {DashboardTableProps} from "../../interfaces/dashboardPropsInterfaces.ts";
import {FC} from "react";
import {Product} from "../../interfaces/prductInterface.ts";
import {LinkContainer} from "react-router-bootstrap";

const DashboardTable: FC<DashboardTableProps> = ({data, categories}) => {
    const selectCategory = (item: Product): string => {
        const selectedCategory = categories.find((category) => category.id === item.categoryId)
        if (selectedCategory) {
            return selectedCategory.title
        } else {
            return "Category not found"
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
            {data.map((item) => (
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