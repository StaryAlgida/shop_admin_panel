import {Product} from "../interfaces/prductInterface.ts";
import Category from "../interfaces/categoryInterface.ts";
import {LinkContainer} from "react-router-bootstrap";

export default function HomeAdvert({data, categories}: {
    data: Product,
    categories: Category[],
}) {
    const formatData = (date: string): string => {
        const inputDate = new Date(date)
        return inputDate.toTimeString().slice(0, 8) + " " + inputDate.toISOString().slice(0, 10);
    }

    const checkNull = (data: string | null): string => {
        return data ? data : "No data"
    }

    return (
        <LinkContainer to={`/advert/${data.id}`}>
            <tr className={data.id ? "cursor-pointer" : "cursor-not-allowed"}>
                <td>{checkNull(data.id)}</td>
                <td>{checkNull(data.seller)}</td>
                <td>{checkNull(data.title)}</td>
                <td>{checkNull(data.price)}</td>
                <td>{data.createdOn ? formatData(data.createdOn) : "No data"}</td>
                <td>{categories.find((category) => category.id === data.categoryId)?.title || data.categoryId}</td>
            </tr>
        </LinkContainer>
    )
}