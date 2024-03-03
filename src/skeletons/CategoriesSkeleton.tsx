import {NavDropdown, Placeholder} from "react-bootstrap";

export default function CategoriesSkeleton() {
    return (
        <>
            <NavDropdown.Item>
                <Placeholder xs={9}/>
            </NavDropdown.Item>
            <NavDropdown.Item>
                <Placeholder xs={6}/>
            </NavDropdown.Item>
            <NavDropdown.Item>
                <Placeholder xs={8}/>
            </NavDropdown.Item>
            <NavDropdown.Item>
                <Placeholder xs={7}/>
            </NavDropdown.Item>
        </>

    )
}