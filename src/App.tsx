import './App.css'
import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";

function App() {

    return (
        <>
            <Header/>
            <section className='container'>
                <Outlet/>
            </section>
        </>
    )
}

export default App
