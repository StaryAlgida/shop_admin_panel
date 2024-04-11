import Header from "./header/Header.tsx";
import {Outlet} from "react-router-dom";
import {ToasterProvider} from "./context/ToasterContext.tsx";
import {Container} from "react-bootstrap";
import {AdvertTableParamProvider} from "./context/ParamContext.tsx";

function App() {

    return (
        <AdvertTableParamProvider>
            <Header/>
            <Container className='mt-3'>
                <ToasterProvider delay={5000}>
                    <Outlet/>
                </ToasterProvider>
            </Container>
        </AdvertTableParamProvider>
    )
}

export default App
