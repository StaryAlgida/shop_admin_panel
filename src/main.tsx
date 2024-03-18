import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import axios from "axios";
import Adverts from "./Adverts.tsx";
import Advert from "./Advert.tsx";
import Edit from "./editComponents/Edit.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import Dashboard from "./Dashboard.tsx";

axios.defaults.baseURL = "http://127.0.0.1:3200";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Dashboard/>,
            },
            {
                path: "/adverts",
                element: <Adverts/>,
            },
            {
                path: "/advert/:advertId",
                element: <Advert/>,
            },
            {
                path: "/advert/:advertId/edit",
                element: <Edit/>,
            },
            {
                path: "*",
                element: <ErrorPage/>
            }
        ]
    }])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
