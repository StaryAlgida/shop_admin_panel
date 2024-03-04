import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import axios from "axios";
import Home from "./Home.tsx";
import Advert from "./Advert.tsx";

axios.defaults.baseURL = "http://127.0.0.1:3200";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/:category",
                element: <Home/>,
            },
            {
                path:"/advert/:advertId",
                element: <Advert/>
            }
        ]
    }])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
