import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Archive from './pages/Archive.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Program from './pages/Program.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Contribution from './pages/Contribution.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Home /> },
            {
                path: '/arkivet',
                element: <Archive />
            },
            {
                path: '/arkivet/:id',
                element: <Contribution />
            },
            {
                path: '/biografi',
                element: <About />
            },
            {
                path: '/kontakt',
                element: <Contact />
            },
            {
                path: '/program',
                element: <Program />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
