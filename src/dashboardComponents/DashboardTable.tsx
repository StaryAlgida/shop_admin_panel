import {Table} from "react-bootstrap";
import {DashboardTableProps} from "../interfaces/propsInterfaces.ts";
import {FC} from "react";
import {Product} from "../interfaces/prductInterface.ts";

const DashboardTable: FC<DashboardTableProps> = ({data, categories}) => {
    const selectCategory = (item: Product): string => {
        const selectedCategory = categories.find((category) => category.id === item.categoryId)
        if(selectedCategory){
            return selectedCategory.title
        }
        else{
            return "Error"
        }
    }
    return (
        <Table striped="columns">
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
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.seller}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{selectCategory(item)}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
}

export default DashboardTable