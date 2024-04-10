import {Product} from "../interfaces/prductInterface.ts";
import {LinkContainer} from "react-router-bootstrap";
import {FC} from "react";

interface Category {
  id: string,
  title: string
}

interface AdvertsTableItemProps {
  data: Product,
  categories: Category[],
}

const AdvertsTableItem: FC<AdvertsTableItemProps> = ({data, categories}) => {
  const formatDate = (date: string): string => {
    if (date !== '') {
      const inputDate = new Date(date)
      return inputDate.toTimeString().slice(0, 8) + " " + inputDate.toISOString().slice(0, 10);
    }
    return "No date"
  }
  const findCategoryName = (): string => {
    return (
        categories.find((category) => category.id === data.categoryId)?.title || data.categoryId
    )
  }
  return (
      <LinkContainer to={`/adverts/${data.id}`}>
        <tr className={data.id ? "cursor-pointer" : "cursor-not-allowed"}>
          <td>{data.id}</td>
          <td>{data.seller}</td>
          <td>{data.title}</td>
          <td>{data.price}</td>
          <td>{formatDate(data.createdOn)}</td>
          <td>{findCategoryName()}</td>
        </tr>
      </LinkContainer>
  )
}
export default AdvertsTableItem