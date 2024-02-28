import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Header from "./Header.tsx";

const router = createBrowserRouter([
    {
     path:"/",
     element: <App/>,
        children:[
            {
                path:"/",
                element: <Header/>,
            }
        ]
    }])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
