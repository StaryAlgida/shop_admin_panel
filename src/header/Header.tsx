import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import useCategory from "../hooks/useCategory.tsx";
import CategoriesSkeleton from "../skeletons/CategoriesSkeleton.tsx";
import CategoryElements from "./CategoryElements.tsx";
import {LinkContainer} from 'react-router-bootstrap';

export default function Header() {
    const [categories, isLoading, isError] = useCategory()
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Admin panel</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/adverts"}>
                            <Nav.Link>Adverts</Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            {isLoading ? <CategoriesSkeleton/> :
                                isError ? <NavDropdown.Item>No Data</NavDropdown.Item> :
                                    <CategoryElements data={categories}/>
                            }
                        </NavDropdown>
                        <LinkContainer to={"/adverts/add"}>
                            <Nav.Link>Add advert</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}