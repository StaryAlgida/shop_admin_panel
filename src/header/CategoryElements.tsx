import {NavDropdown} from "react-bootstrap";
import Category from "../interfaces/categoryInterface.ts";
import {FC, useContext} from "react";
import {ParamContext} from "../context/ParamContext.tsx";

interface CategoryElementsParams {
    data: Category[],
}

const CategoryElements: FC<CategoryElementsParams> = ({data}) => {
    const {updateParams} = useContext(ParamContext)
    return (
        <>
            {data.map((category) => (
                <NavDropdown.Item
                    key={category.id}
                    onClick={() => updateParams("category", `${category.id}`)}
                >
                    {category.title}
                </NavDropdown.Item>
            ))}
        </>
    )
}

export default CategoryElements