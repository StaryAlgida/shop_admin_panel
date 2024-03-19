import {Product} from "../interfaces/prductInterface.ts";
import Category from "../interfaces/categoryInterface.ts";
import {LinkContainer} from "react-router-bootstrap";

export default function AdvertsTableItem({data, categories}: {
    data: Product,
    categories: Category[],
}) {
    const formatData = (date: string): string => {
        const inputDate = new Date(date)
        return inputDate.toTimeString().slice(0, 8) + " " + inputDate.toISOString().slice(0, 10);
    }

    return (
        <LinkContainer to={`/adverts/${data.id}`}>
            <tr className={data.id ? "cursor-pointer" : "cursor-not-allowed"}>
                <td>{data.id}</td>
                <td>{data.seller}</td>
                <td>{data.title}</td>
                <td>{data.price}</td>
                <td>{formatData(data.createdOn)}</td>
                <td>{categories.find((category) => category.id === data.categoryId)?.title || data.categoryId}</td>
            </tr>
        </LinkContainer>
    )
}