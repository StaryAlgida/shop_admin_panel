import Header from "./header/Header.tsx";
import {Outlet} from "react-router-dom";
import {ToasterProvider} from "./context/ToasterContext.tsx";
import {Container} from "react-bootstrap";
import {ParamProvider} from "./context/ParamContext.tsx";

function App() {

    return (
        <ParamProvider>
            <Header/>
            <Container className='mt-3'>
                <ToasterProvider delay={5000}>
                    <Outlet/>
                </ToasterProvider>
            </Container>
        </ParamProvider>
    )
}

export default App
