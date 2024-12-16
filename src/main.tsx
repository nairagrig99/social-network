import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter, createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage.tsx";
import UserAccount from "./customer/UserAccount/UserAccount.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/account",
        element: <UserAccount/>
    },
    // {
    //     path: "/account/",
    //     element: <UserAccount/>
    // },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
