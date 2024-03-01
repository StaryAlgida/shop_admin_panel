import './App.css'
import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";
import {ToasterProvider} from "./context/ToasterContext.tsx";

function App() {

    return (
        <>
            <Header/>
            <section className='container'>
                <ToasterProvider delay={5000}>
                    <Outlet/>
                </ToasterProvider>
            </section>
        </>
    )
}

export default App
