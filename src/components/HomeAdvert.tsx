import {Product} from "../interfaces/prductInterface.ts";
import Category from "../interfaces/categoryInterface.ts";

export default function HomeAdvert({data, categories}: {
    data: Product,
    categories: Category[],
}) {
    const formatData = (date: string): string => {
        const inputDate = new Date(date)
        return inputDate.toTimeString().slice(0, 8) + " " + inputDate.toISOString().slice(0, 10);
    }

    return (
        <tr>
            <td>{data.id}</td>
            <td>{data.seller}</td>
            <td>{data.title}</td>
            <td>{data.price}</td>
            <td>{data.createdOn === "No data" ? "No data" : formatData(data.createdOn)}</td>
            <td>{categories.find((category) => category.id === data.categoryId)?.title || data.categoryId}</td>
        </tr>
    )
}