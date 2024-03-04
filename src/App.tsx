import './App.css'
import Header from "./header/Header.tsx";
import {Outlet} from "react-router-dom";
import {ToasterProvider} from "./context/ToasterContext.tsx";
import {PaginationProvider} from "./context/PaginationContext.tsx";

function App() {

    return (
        <PaginationProvider>
            <Header/>
            <section className='container mt-3'>
                <ToasterProvider delay={5000}>
                    <Outlet/>
                </ToasterProvider>
            </section>
        </PaginationProvider>
    )
}

export default App
