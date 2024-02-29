import Product from "../interfaces/prductInterface.ts";
import Category from "../interfaces/categoryInterface.ts";

export default function HomeAdvert({data, categories}: { data: Product, categories: Category[] }) {
    return (
        <tr>
            <td>{data.id}</td>
            <td>{data.seller}</td>
            <td>{data.title}</td>
            <td>{data.createdOn}</td>
            <td>{categories.find((category) => category.id === data.categoryId)?.title || data.categoryId}</td>
        </tr>
    )
}