import {NavDropdown} from "react-bootstrap";
import Category from "../interfaces/categoryInterface.ts";
import {useContext} from "react";
import {PaginationContext} from "../context/PaginationContext.tsx";
import {LinkContainer} from "react-router-bootstrap";

export default function CategoryElements({data}: { data: Category[] }) {

    const {updateCategory, updateCurrentPage} = useContext(PaginationContext)
    const update = (id:string)=>{
        updateCategory(id)
        updateCurrentPage(1)
    }
    return (
        <>
            {data.map((category) => (
                <LinkContainer key={category.id} to={`/${category.title.toLowerCase()}`}>
                    <NavDropdown.Item onClick={() => update(category.id)}>
                        {category.title}
                    </NavDropdown.Item>
                </LinkContainer>
            ))}
        </>
    )
}