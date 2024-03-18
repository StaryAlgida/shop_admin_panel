import './App.css'
import Header from "./header/Header.tsx";
import {Outlet} from "react-router-dom";
import {ToasterProvider} from "./context/ToasterContext.tsx";
import {PaginationProvider} from "./context/PaginationContext.tsx";
import {Container} from "react-bootstrap";

function App() {

    return (
        <PaginationProvider>
            <Header/>
            <Container className='mt-3'>
                <ToasterProvider delay={5000}>
                    <Outlet/>
                </ToasterProvider>
            </Container>
        </PaginationProvider>
    )
}

export default App
